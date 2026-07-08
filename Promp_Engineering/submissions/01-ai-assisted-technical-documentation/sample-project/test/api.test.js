// test/api.test.js
// Lightweight smoke test (no framework dependency) that exercises the
// documented API paths so the docs can be fact-checked against real behavior.
const assert = require('assert');
const http = require('http');
const app = require('../server');

function request(server, method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    const req = http.request(
      { hostname: '127.0.0.1', port: server.address().port, path, method, headers },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          let parsed = null;
          try { parsed = raw ? JSON.parse(raw) : null; } catch (e) { parsed = raw; }
          resolve({ status: res.statusCode, body: parsed });
        });
      }
    );
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

(async () => {
  const server = app.listen(0);

  // Register
  const reg = await request(server, 'POST', '/api/auth/register', {
    name: 'Ada Lovelace', email: 'ada@example.com', password: 'secret123',
  });
  assert.strictEqual(reg.status, 201, 'register should return 201');

  // Login success
  const login = await request(server, 'POST', '/api/auth/login', {
    email: 'ada@example.com', password: 'secret123',
  });
  assert.strictEqual(login.status, 200, 'login should return 200');
  assert.ok(login.body.token, 'login should return a token');

  // Login failure
  const badLogin = await request(server, 'POST', '/api/auth/login', {
    email: 'ada@example.com', password: 'wrong',
  });
  assert.strictEqual(badLogin.status, 401, 'bad login should return 401');

  const token = login.body.token;

  // Create task
  const created = await request(server, 'POST', '/api/tasks', { title: 'Write docs' }, token);
  assert.strictEqual(created.status, 201, 'create task should return 201');
  assert.strictEqual(created.body.task.status, 'todo', 'new task defaults to todo');

  // List tasks
  const list = await request(server, 'GET', '/api/tasks', null, token);
  assert.strictEqual(list.status, 200);
  assert.strictEqual(list.body.tasks.length, 1);

  // Update task
  const taskId = created.body.task.id;
  const updated = await request(server, 'PUT', `/api/tasks/${taskId}`, { status: 'in-progress' }, token);
  assert.strictEqual(updated.status, 200);
  assert.strictEqual(updated.body.task.status, 'in-progress');

  // Invalid status
  const badStatus = await request(server, 'PUT', `/api/tasks/${taskId}`, { status: 'archived' }, token);
  assert.strictEqual(badStatus.status, 400);

  // No auth
  const noAuth = await request(server, 'GET', '/api/tasks', null, null);
  assert.strictEqual(noAuth.status, 401);

  // Delete task
  const del = await request(server, 'DELETE', `/api/tasks/${taskId}`, null, token);
  assert.strictEqual(del.status, 204);

  // Not found after delete
  const notFound = await request(server, 'GET', `/api/tasks/${taskId}`, null, token);
  assert.strictEqual(notFound.status, 404);

  console.log('All TaskFlow API smoke tests passed.');
  server.close();
})();
