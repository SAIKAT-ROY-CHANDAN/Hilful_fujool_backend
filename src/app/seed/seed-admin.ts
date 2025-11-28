import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client';
import config from "../config";

const prisma = new PrismaClient();

export default prisma;

const MODULES = [
    "DASHBOARD",
    "SERVICES",
    "PACKAGE",
    "FIVE PILLARS OF ISLAM",
    "CONTACTS",
    "GALLERY",
    "REVIEWS",
    "BLOGS",
    "ROLES & PERMISSIONS",
    "PAGE SETTINGS",
    "HERO AREA",
    "ABOUT US",
    "CONTACT US",
    "UPDATE PROFILE",
];

export async function seedSuperAdmin() {
    const existingAdmin = await prisma.role.findFirst();

    if (!existingAdmin) {
        const hashed = await bcrypt.hash(config.password, 10);

        await prisma.role.create({
            data: {
                name: config.adminFullName || "Super Admin",
                email: config.adminEmail,
                password: hashed,
                status: "ACTIVE",
                description: "System Super Admin",
                permissions: {
                    create: MODULES.map((module) => ({
                        module,
                        canCreate: true,
                        canEdit: true,
                        canDelete: true,
                    })),
                },
            },
        });

        console.log("Super Admin created with all permissions!");
    } else {
        console.log("Skipping seed — roles already exist.");
    }
}