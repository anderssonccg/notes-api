import prisma from "../prismaClient.js";

export const getColors = async (req, res) => {
  try {
    const colors = await prisma.color.findMany();
    return res.json(colors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
