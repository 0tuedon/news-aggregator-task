import ArticleList from "../components/ArticleList"
import { useGetFromGuardianAPIQuery, useGetFromNewsAPIQuery, useGetFromNYTAPIQuery } from "../services"


const HomePage = ()=>{
 const { data, error, isLoading } = useGetFromNYTAPIQuery('')
 console.log(data)
  return <div>

    <ArticleList />
  </div>
}

export default HomePage
