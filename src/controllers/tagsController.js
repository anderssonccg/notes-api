import prisma from "../prismaClient.js";

export const getTags = async (_, res) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTagById = async (req, res) => {
  const { id } = req.body;
  try {
    const tag = await prisma.tag.findUnique({
      where: id,
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
