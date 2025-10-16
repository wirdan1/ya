const axios = require("axios");

/**
 * @swagger
 * /api/plugins/search/lyrics:
 *   get:
 *     summary: Mencari lirik lagu
 *     parameters:
 *       - name: title
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
module.exports = {
  name: "Lyrics",
  desc: "Mencari lirik lagu berdasarkan judul",
  category: "Search",
  params: ["title"],
  async run(req, res) {
    const { title } = req.query;
    try {
      const { data } = await axios.get(
        `https://lrclib.net/api/search?q=${encodeURIComponent(title)}`,
        {
          headers: {
            referer: `https://lrclib.net/search/${encodeURIComponent(title)}`,
            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"
          }
        }
      );
      res.json({ status: true, query: title, result: data });
    } catch (err) {
      res.status(500).json({ status: false, error: "Gagal mengambil lirik" });
    }
  }
};