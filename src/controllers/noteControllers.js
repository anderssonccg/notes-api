import prisma from "../prismaClient.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      include: {
        user: true,
        tag: true,
        color: true,
        background: true,
        font: true,
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
        color: true,
        background: true,
        font: true,
      },
    });
    if (!note) return res.status(404).json({ error: "Nota inexsistente." });
    return res.json(note);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createNote = async (req, res) => {
  const {
    title,
    description,
    isImportant,
    colorId,
    backgroundId,
    fontId,
    tagName,
    userId,
  } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ error: "El titulo no puede estar vacio" });
    }
    const newNote = await prisma.note.create({
      data: {
        title,
        description,
        isImportant,
        color: {
          connect: {
            id: colorId,
          },
        },
        background: {
          connect: {
            id: backgroundId,
          },
        },
        font: {
          connect: {
            id: fontId,
          },
        },
        tag: {
          connectOrCreate: {
            where: { tagName },
            create: { tagName },
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.status(201).json(newNote);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
