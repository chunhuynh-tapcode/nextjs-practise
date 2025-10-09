import postgres from 'postgres';

// Bỏ chú thích cho phần kết nối DB
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Bỏ chú thích cho hàm truy vấn
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 667.27;
  `;

  return data;
}

export async function GET() {
  // Xóa block Response.json({...}) trả về message dummy

  // Bỏ chú thích cho block try...catch và để nó là logic chính
  try {
    const data = await listInvoices();
    return Response.json(data);
  } catch (error) {
    console.error("Database Query Error:", error);
    return Response.json({ error: 'Failed to fetch invoices.' }, { status: 500 });
  }
}