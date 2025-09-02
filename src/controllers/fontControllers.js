import prisma from "../prismaClient.js";

export const getFonts = async (req, res) => {
  try {
    const fonts = await prisma.font.findMany();
    return res.json(fonts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
