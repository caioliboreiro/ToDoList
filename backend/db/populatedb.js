const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      password: "$2b$10$66UFGce52LX7ThZGZhe8ZexVPCaR7f8UcuFuQjkDgVZQrWJhdKvj2",
      projects: [
        {
          name: "Website Redesign",
          tasks: [
            {
              title: "Design Homepage",
              description: "Create a new homepage layout",
              date: new Date("2025-04-10"),
              priority: "High",
              position: 1,
            },
          ],
        },
      ],
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      password: "$2b$10$UBA5o5fG9Eq4BxZ/89vWj.SO60adNASFw0Ppe7HhhFG3fN0/QmGEa",
      projects: [
        {
          name: "Mobile App Dev",
          tasks: [
            {
              title: "Backend API",
              description: "Develop API endpoints for mobile app",
              date: new Date("2025-04-15"),
              priority: "Medium",
              position: 1,
            },
            {
              title: "User Testing",
              description: "Conduct user testing for new features",
              date: new Date("2025-04-18"),
              priority: "High",
              position: 2,
            },
          ],
        },
      ],
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      password: "$2b$10$JqpA/jSOqa2a5fANN0a9aO.VMhtS20vjOaIEW1BkkZ0eO4kyJTW9K",
      projects: [
        {
          name: "Marketing Campaign",
          tasks: [
            {
              title: "SEO Optimization",
              description: "Improve website SEO ranking",
              date: new Date("2025-04-12"),
              priority: "Low",
              position: 1,
            },
            {
              title: "Social Media Ads",
              description: "Launch targeted ads on social media",
              date: new Date("2025-04-16"),
              priority: "High",
              position: 2,
            },
          ],
        },
      ],
    },
    {
      firstName: "Bob",
      lastName: "Williams",
      password: "$2b$10$3RwA.xIgaHCCqVCtQ54ememgKWDFuBlLR5cTWpKmFe6MRqZ8YOT6e",
      projects: [
        {
          name: "Data Analysis",
          tasks: [
            {
              title: "Data Cleanup",
              description: "Clean and organize the dataset",
              date: new Date("2025-04-14"),
              priority: "Medium",
              position: 1,
            },
          ],
        },
      ],
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.firstName.toLowerCase() + user.lastName.toLowerCase(),
        password: user.password,
        project: {
          create: user.projects.map((project, index) => ({
            name: project.name,
            tasks: {
              create: project.tasks,
            },
            position: index + 1,
          })),
        },
      },
    });
  }

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
