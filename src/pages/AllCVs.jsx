import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const fakeCVsData = [
  {
    user: {
      firstname: "John",
      lastname: "Doe",
    },
    cv: {
      id : 1,
      description: "Experienced software engineer with a passion for developing innovative programs.",
    },
  },
  {
    user: {
      firstname: "Jane",
      lastname: "Smith",
    },
    cv: {
      id : 2,
      description: "Marketing specialist skilled in digital advertising and branding strategies.",
    },
  },
  {
    user: {
      firstname: "Alice",
      lastname: "Johnson",
    },
    cv: {
      id : 3,
      description: "Creative graphic designer with a knack for crafting visually compelling content.",
    },
  },
  {
    user: {
      firstname: "Robert",
      lastname: "Williams",
    },
    cv: {
      id : 4,
      description: "Project manager with over 10 years of experience leading successful teams.",
    },
  },
  {
    user: {
      firstname: "Emily",
      lastname: "Brown",
    },
    cv: {
      id : 5,
      description: "HR specialist with a strong background in recruitment and employee relations.",
    },
  },
  {
    user: {
      firstname: "Michael",
      lastname: "Garcia",
    },
    cv: {
      id : 6,
      description: "Data analyst proficient in transforming data into business insights for decision-making.",
    },
  },
  {
    user: {
      firstname: "Sophia",
      lastname: "Martinez",
    },
    cv: {
      id : 7,
      description: "UX/UI designer focused on creating user-centered design solutions for web and mobile apps.",
    },
  },
  {
    user: {
      firstname: "David",
      lastname: "Miller",
    },
    cv: {
      id : 8,
      description: "Full-stack developer with expertise in building scalable web applications using modern frameworks.",
    },
  },
  {
    user: {
      firstname: "Olivia",
      lastname: "Lopez",
    },
    cv: {
      id : 9,
      description: "Content writer skilled in crafting compelling and engaging stories for diverse audiences.",
    },
  },
  {
    user: {
      firstname: "James",
      lastname: "Gonzalez",
    },
    cv: {
      id : 10,
      description: "Financial advisor with a comprehensive understanding of investment strategies and risk management.",
    },
  },
];

function AllCVs() {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {fakeCVsData.map((data, index) => (
        <Link key={index} to={`/cv/${data.cv.id}`}>
          <Card className="hover:shadow-lg">
            <CardHeader>
              <CardTitle>{data.user.firstname} {data.user.lastname}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2">{data.cv.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default AllCVs;
