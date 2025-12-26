const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'browser-test')));

// Ensure directories
const LOG_DIR = path.join(__dirname, 'collected-logs');
const IMG_DIR = path.join(LOG_DIR, 'screenshots');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

app.post('/collect-log', (req, res) => {
	try {
		const now = Date.now();
		const name = (req.body && req.body.name) ? req.body.name.replace(/[^a-z0-9_-]/gi, '_') : `client_${now}`;
		const log = req.body && req.body.log ? String(req.body.log) : '';
		const image = req.body && req.body.screenshot ? String(req.body.screenshot) : null;

		const logPath = path.join(LOG_DIR, `${name}-${now}.log.txt`);
		fs.writeFileSync(logPath, log);

		if (image && image.startsWith('data:image')) {
			const matches = image.match(/^data:(image\/\w+);base64,(.+)$/);
			if (matches) {
				const ext = matches[1].split('/')[1];
				const data = Buffer.from(matches[2], 'base64');
				const imgPath = path.join(IMG_DIR, `${name}-${now}.${ext}`);
				fs.writeFileSync(imgPath, data);
			}
		}

		res.json({ ok: true, saved: true });
	} catch (err) {
		console.error('collect-log error', err);
		res.status(500).json({ ok: false, error: String(err) });
	}
});

app.listen(PORT, () => console.log(`Static test server running on http://localhost:${PORT}`));
