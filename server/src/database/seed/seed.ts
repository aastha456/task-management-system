import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import UserModel from "../../models/UserModel";
import WorkspaceModel from "../../models/WorkspaceModel";
import ProjectModel from "../../models/ProjectModel";
import TaskModel from "../../models/TaskModel";
import WorkspaceMemberModel from "../../models/WorkspaceMemberModel";
import appRoles from "../../constants/appRoles";
import workspaceRoles from "../../constants/workspaceRoles";
import {NUMBER_OF_SALT_ROUNDS} from "../../constants/auth";

dotenv.config();

const seed = async () => {
    
    const mongoURI = process.env.MONGO_URI;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;

     if (!mongoURI) {
        throw new Error("MONGO_URI is not defined");
    }
    if(!adminEmail){
        throw new Error("ADMIN_EMAIL is not defined");
    }
    if(!adminPassword){
        throw new Error("ADMIN_PASSWORD is not defined");
    }
    if(!adminName){
        throw new Error("ADMIN_NAME is not defined");
    }


    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    // clear existing data
    await UserModel.deleteMany({});
    await WorkspaceModel.deleteMany({});
    await ProjectModel.deleteMany({});
    await TaskModel.deleteMany({});
    await WorkspaceMemberModel.deleteMany({});

    console.log("Cleared existing data");

    const hashedPassword = await bcrypt.hash(adminPassword, NUMBER_OF_SALT_ROUNDS);
    const admin = await UserModel.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: appRoles.ADMIN
    });

    const user1 = await UserModel.create({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: await bcrypt.hash("password123", NUMBER_OF_SALT_ROUNDS),
        role: appRoles.USER
    });

    const user2 = await UserModel.create({
        name: "Jane Smith",
        email: "janesmith@gmail.com",
        password: await bcrypt.hash("password123", NUMBER_OF_SALT_ROUNDS),
        role: appRoles.USER
    });

    console.log("Created users");

    const workspace = await WorkspaceModel.create({
        name: "Project Alpha",
        description: "This is the first project workspace",
        owner: admin._id,
        isPrivate: false
    });
    

    await WorkspaceMemberModel.create({
        workspace: workspace._id,
        user: admin._id,
        role: workspaceRoles.OWNER
    });

    await WorkspaceMemberModel.create({
        workspace: workspace._id,
        user: user1._id,
        role: workspaceRoles.MEMBER
    });

    await WorkspaceMemberModel.create({
        workspace: workspace._id,
        user: user2._id,
        role: workspaceRoles.MEMBER
    });
    console.log("Workspace and members created");

    const project1 = await ProjectModel.create({
        name: "Website Redesign",
        description: "Redesign the company website to improve user experience and update the branding",
        workspace: workspace._id,
        createdBy: admin._id
    })

    const project2 = await ProjectModel.create({
        name: "Mobile App",
        description: "Develop a mobile app for our services to reach a wider audience and provide better accessibility",
        workspace: workspace._id,
        createdBy: user1._id
    })

    console.log("Projects created");

    await TaskModel.create({
        title: "Create Wireframes",
        description: "Design wireframes for the new website layout",
        status: "todo",
        priority: "high",
        projectId: project1._id,
        workspaceId: workspace._id,
        assignedTo: user1._id,
        createdBy: admin._id
    });

    await TaskModel.create({
        title: "Develop Frontend",
        description: "Implement the frontend of the website using React",   
        status: "in-progress",
        priority: "medium",
        projectId: project1._id,
        workspaceId: workspace._id,
        assignedTo: user2._id,
        createdBy: admin._id
    });

    await TaskModel.create({
        title: "Set Up Backend",
        description: "Set up the backend server and database for the website",
        status: "todo",
        priority: "high",
        projectId: project1._id,
        workspaceId: workspace._id,
        assignedTo: user1._id,
        createdBy: admin._id
    })

    await TaskModel.create({
        title: "Design Mobile App UI",
        description: "Create the user interface design for the mobile app",
        status: "todo",
        priority: "medium",
        projectId: project2._id,
        workspaceId: workspace._id,
        assignedTo: user2._id,
        createdBy: user1._id
    })

    await TaskModel.create({
        title: "Write Unit Tests",
        description: "Write unit tests for the mobile app functionality",
        status: "todo",
        priority: "medium",
        projectId: project2._id,
        workspaceId: workspace._id,
        assignedTo: user1._id,
        createdBy: user1._id
    })

    console.log("Tasks created");
    console.log("Database seeding completed");
    console.log("-----------------------------------------");
    console.log(`Admin: ${adminEmail}, Password: ${adminPassword}`);
    console.log(`User1: ${user1.email}, Password: password123`);
    console.log(`User2: ${user2.email}, Password: password123`);
    console.log("-----------------------------------------");


    await mongoose.disconnect();
    process.exit(0);    

}

seed().catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
});
