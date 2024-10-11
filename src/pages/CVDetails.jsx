import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VITE_BACK_URL = import.meta.env.VITE_BACK_URL || "http://localhost:3000/api";

function CVDetails() {
  const [cvData, setCvData] = useState([])
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    async function getCvs() {
      try {
        const response = await fetch(`${VITE_BACK_URL}/cv/`);

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
  },[])
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
          <p className="text-gray-500">Email: {cvData?.email}</p>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* Educational Experience Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Educational Experience</h2>
        {cvData?.educationalExperiences?.map((education, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{education.name}</CardTitle>
              <CardDescription className="text-gray-500">
                {education.start_date} - {education.end_date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{education.description}</p>
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
              <CardTitle className="text-xl font-semibold">{experience.name}</CardTitle>
              <CardDescription className="text-gray-500">
                {experience.start_date} - {experience.end_date ? experience.end_date : "Present"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{experience.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Recommendations Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
        {cvData?.recommandations?.length > 0 ? (
          cvData?.recommandations?.map((recommendation, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Recommendation {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{recommendation.texte}</p>
                <div className="flex items-center mt-2">
                  <Badge variant="outline" className="mr-2">
                    Rating: {recommendation.avis}/5
                  </Badge>
                  <p className="text-gray-500">Author ID: {recommendation.auteur_id}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
}

export default CVDetails;
