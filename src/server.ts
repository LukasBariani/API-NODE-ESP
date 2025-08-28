
import createApp from "./app"

const app = createApp();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`🐱‍🐉 server running at por http://localhost:${port}`);

})


