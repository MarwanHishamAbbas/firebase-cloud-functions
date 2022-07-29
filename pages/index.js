import Head from "next/head";

import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  async function handleOnSubmit(e) {
    e.preventDefault();
    // Retrive all input data from a form
    const formData = {};
    Array.from(e.currentTarget.elements).forEach((field) => {
      // only button does not have a name attr.
      if (!field.name) return;
      formData[field.name] = field.value;
    });
    console.log(formData);

    await fetch(
      "https://orca-v2-backend-default-rtdb.firebaseio.com/careers.json",
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    );
  }
  const fetchData = async () => {
    const res = await fetch(
      "https://orca-v2-backend-default-rtdb.firebaseio.com/careers.json"
    );
    const data = await res.json();
    // Convert an object of keys containing objects to an array of objects
    const arrayResult = Object.keys(data).map((item) => {
      return data[item];
    });
    console.log(arrayResult);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Contact me for cool stuff!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Contact Me</h1>

        <p className={styles.description}>Please be human!</p>

        <div className={styles.grid}>
          <style jsx>{`
            form {
              font-size: 1.2em;
            }
            label {
              display: block;
              margin-bottom: 0.2em;
            }
            input,
            textarea {
              width: 100%;
              padding: 0.8em;
            }
            button {
              color: white;
              font-size: 1em;
              background-color: blueviolet;
              padding: 0.8em 1em;
              border: none;
              border-radius: 0.2em;
            }
          `}</style>
          <form onSubmit={handleOnSubmit}>
            <p>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input id="email" type="text" name="email" />
            </p>
            <p>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" />
            </p>
            <p>
              <button>Submit</button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
