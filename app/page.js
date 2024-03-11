import { ConnectDB } from "@/db/connection";
import Quote from "@/models/Quote";
import { revalidatePath } from "next/cache";

export default async function Page() {
  ConnectDB();
  const data = await Quote.find({});

  async function createQuote(formData) {
    "use server";
    const conn = await ConnectDB();
    const rawData = {
      quote: formData.get("quote"),
      author: formData.get("author"),
    };

    const newQuote = await Quote.create(rawData);

    console.log(newQuote);

    revalidatePath("/", { cache: "no-store" });
  }

  return (
    <div>
      <h1 className="text-center text-4xl mt-8 mb-8">ORSIQUOTES</h1>
      <div>
        <form className="grid place-content-center" action={createQuote}>
          <label htmlFor="quote">Quote</label>
          <textarea
            id="quote"
            name="quote"
            placeholder="Enter the quote"
          ></textarea>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter the author"
          />

          <button className=" bg-green-700" type="submit">
            Send
          </button>
        </form>
        <div id="quotes">
          {data.map((item) => (
            <section key={item._id}>
              <quote>{item.quote}</quote>
              <p>{item.author}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
