import prisma from "../prismaClient.js";

export const getBackgrounds = async (req, res) => {
  try {
    const backgrounds = await prisma.background.findMany();
    return res.json(backgrounds);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
