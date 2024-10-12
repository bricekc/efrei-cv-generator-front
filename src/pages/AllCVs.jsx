import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VITE_BACK_URL = import.meta.env.VITE_BACK_URL || "http://localhost:3000/api";

function AllCVs() {
  const [cvsData, setCvsData] = useState([])

  useEffect(() => {
    async function getCvs() {
      try {
        const response = await fetch(`${VITE_BACK_URL}/cv`);

        if (!response.ok) {
        throw new Error("Failed to cv");
        }

        const data = await response.json();
        console.log("Cv successful:", data);
        setCvsData(data)
      } catch (error) {
        console.error("Cv error:", error);
      }
    } 
    getCvs()
  },[])

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cvsData.map((data, index) => (
        <Link key={index} to={`/cv/${data?._id}`}>
          <Card className="hover:shadow-lg">
            <CardHeader>
              <CardTitle>{data?.user?.firstname} {data?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2">{data?.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default AllCVs;
