import db from "../../../../db/db.config.js";

const getRecentConversationRows = async (limit = 5) => {
  const normalizedLimit = Number.parseInt(limit, 10)
  const safeLimit =
    Number.isNaN(normalizedLimit) || normalizedLimit <= 0 ? 5 : normalizedLimit;
  const [rows] = await db.execute(
    `SELECT id, role, content, created_at 
    FROM conversations 
    ORDER BY id DESC 
    LIMIT ${safeLimit}`,
  );
  return rows;
};

export async function createConversationService(Question) {
  try {
    // Validation
    if (!Question.trim()) {
      const error = new Error("Question is required");
      error.status = 400;
      throw error;
    }

    // save to db
    // await db.execute('INSERT INTO conversations (content) VALUES (?)', [Question]);

    const rows = await getRecentConversationRows(5);

    return rows;
  } catch (error) {
    throw error;
  }
}