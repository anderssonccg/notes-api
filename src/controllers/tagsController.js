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
  const { id } = req.params;
  try {
    const tag = await prisma.tag.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTag = async (req, res) => {
  const { tagName } = req.body;
  try {
    const tag = await prisma.tag.create({
      data: {
        tagName,
      },
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  const { tagName } = req.body;
  try {
    const tag = await prisma.tag.update({
      where: { id: parseInt(id) },
      data: {
        tagName,
      },
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tag.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
