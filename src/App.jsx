import Header from "./components/Header"
import Footer from "./components/Footer"
import Card from "./components/RecipePage/Card"
import  SearchBar from "./components/RecipePage/SearchBar"



function App() {
 

  return (
    <>
      <Header/>
      <SearchBar/>
      <div className="grid grid-cols-4 px-[120px] py-[50px]">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      </div>
      
      <Footer/>
    </>
  )
}

export default App
