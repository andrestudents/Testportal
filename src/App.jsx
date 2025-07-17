import Banner from "./components/Banner";
import Header from "./components/Header";
import ListPost from "./components/ListPost";

function App() {
    return (
        <>
            <Header />
            <Banner />
            <div className="max-w-7xl mx-auto pt-20 px-6">
                <ListPost />
            </div>
        </>

    );
}

export default App;