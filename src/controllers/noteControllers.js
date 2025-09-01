import prisma from "../prismaClient.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      include: {
        user: true,
        tag: true,
      },
    });
    return res.json(notes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
        tag: true,
      },
    });
    if (!note) return res.status(404).json({ error: "Nota inexsistente." });
    return res.json(note);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
