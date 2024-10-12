import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "@/components/Reviews.jsx";

const VITE_BACK_URL = import.meta.env.VITE_BACK_URL || "http://localhost:3000/api";

function CVDetails() {
  const [cvData, setCvData] = useState([])
  const { id } = useParams();

  useEffect(() => {
    async function getCvs() {
      try {
        const response = await fetch(`${VITE_BACK_URL}/cv/${id}`);

        if (!response.ok) {
        throw new Error("Failed to cv");
        }

        const data = await response.json();
        console.log("Cv successful:", data);
        setCvData(data)
      } catch (error) {
        console.error("Cv error:", error);
      }
    } 
    getCvs()
  },[id])

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  

  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto">
      {/* User Info Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {cvData.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg mb-4">{cvData.description}</p>
          <p className="text-gray-500">Email: {cvData?.user?.email}</p>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* Educational Experience Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Educational Experience</h2>
        {cvData?.educationalExperiences?.map((education, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{education?.name}</CardTitle>
              <CardDescription className="text-gray-500">
              {formatDate(education?.startDate)} - {education?.endDate ? formatDate(education?.endDate) : "Present"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{education?.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Professional Experience Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Professional Experience</h2>
        {cvData?.professionalExperiences?.map((experience, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{experience?.name}</CardTitle>
              <CardDescription className="text-gray-500">
              {formatDate(experience?.startDate)} - {experience?.endDate ? formatDate(experience?.endDate) : "Present"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{experience?.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Recommendations Section */}
      <Reviews reviews={cvData?.reviews} idCv={id} />
    </div>
  );
}

export default CVDetails;
