import app from ".";
import "./db";

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`sv running at ${PORT}`));
