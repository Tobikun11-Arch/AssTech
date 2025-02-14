import puppeteer from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(req.body.html);
        const pdf = await page.pdf({ format: "A4" });

        await browser.close();
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdf);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate PDF" });
    }
}