import prisma from "../prismaClient.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      include: {
        user: true,
        tag: true,
      },
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.body;
  try {
    const note = await prisma.note.findUnique({
      where: id,
      include: {
        user: true,
        tag: true,
      },
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
