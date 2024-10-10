import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function CVDetails() {
  const { user, cv, recommandations } = fakeCVData;

  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto">
      {/* User Info Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {user.first_name} {user.last_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg mb-4">{cv.description}</p>
          <p className="text-gray-500">Email: {user.email}</p>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* Educational Experience Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Educational Experience</h2>
        {cv.educational_experience.map((education, index) => (
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
        {cv.professional_experience.map((experience, index) => (
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
        {recommandations.length > 0 ? (
          recommandations.map((recommendation, index) => (
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


const fakeCVData = {
  user: {
    id: 1,
    email: "johndoe@example.com",
    password: "hashedpassword123",
    first_name: "John",
    last_name: "Doe",
  },
  cv: {
    id: 1,
    user_id: 1,
    is_visible: true,
    description: "Experienced software engineer with a passion for building innovative solutions.",
    educational_experience: [
      {
        name: "MIT - Computer Science",
        start_date: "2012-09-01",
        end_date: "2016-06-01",
        description: "Bachelor's degree in Computer Science with a focus on software engineering."
      },
      {
        name: "Stanford University - Artificial Intelligence",
        start_date: "2017-09-01",
        end_date: "2019-06-01",
        description: "Master's degree in AI, specializing in machine learning and data science."
      }
    ],
    professional_experience: [
      {
        name: "Google - Software Engineer",
        start_date: "2016-07-01",
        end_date: "2019-08-01",
        description: "Developed scalable backend services for Google Cloud products and improved overall performance."
      },
      {
        name: "Facebook - Senior Software Engineer",
        start_date: "2019-09-01",
        end_date: "2022-12-01",
        description: "Led a team of engineers to build real-time recommendation systems, enhancing user engagement by 15%."
      },
      {
        name: "Tesla - Principal Engineer",
        start_date: "2023-01-01",
        end_date: null,
        description: "Architected the software for autonomous driving systems, improving reliability by 30%."
      }
    ],
  },
  recommandations: [
    {
      id: 1,
      user_id: 2,
      cv_id: 1,
      texte: "John is an exceptional engineer with deep knowledge in AI and software architecture. His contributions at Google and Facebook were critical.",
      avis: 5,
    },
    {
      id: 2,
      user_id: 3,
      cv_id: 1,
      texte: "Highly recommended! John's ability to solve complex problems and lead teams is remarkable.",
      avis: 4,
    }
  ]
};

