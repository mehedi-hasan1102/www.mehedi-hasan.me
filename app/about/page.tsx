import About from "../components/About";
import Experience from "../components/Experience";
import GitHubActivity from '../components/GitHubActivity';


export default function whoami() {
  return (
    <div className="min-h-screen pt-24 pb-12">
   
   <About />
       

     
        <Experience  />
      
        <GitHubActivity />
    
    </div>
  );
}
