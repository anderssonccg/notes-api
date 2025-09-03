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
    if (!title || title === "") {
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
            where: { tagName: tagName === "" ? "all" : tagName },
            create: { tagName: tagName === "" ? "all" : tagName },
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: true,
        tag: true,
        color: true,
        background: true,
        font: true,
      },
    });
    return res.status(201).json(newNote);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    isImportant,
    colorId,
    backgroundId,
    fontId,
    tagName,
  } = req.body;
  try {
    if (!title || title === "") {
      return res.status(400).json({ error: "El titulo no puede estar vacio" });
    }
    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id) },
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
            where: { tagName: tagName === "" ? "all" : tagName },
            create: { tagName: tagName === "" ? "all" : tagName },
          },
        },
      },
      include: {
        user: true,
        tag: true,
        color: true,
        background: true,
        font: true,
      },
    });
    return res.status(201).json(updatedNote);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.note.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "Nota eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
