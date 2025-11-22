// Script to fix all Next.js 16 params issues
// Run this to update all dynamic route files

const fs = require('fs');
const path = require('path');

const filesToFix = [
    'src/app/api/tournaments/[id]/route.ts',
    'src/app/api/tournaments/[id]/register/route.ts',
    'src/app/api/users/[id]/route.ts',
    'src/app/api/users/[id]/ban/route.ts',
    'src/app/api/rankings/[userId]/route.ts',
];

filesToFix.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace params type definition
    content = content.replace(
        /\{ params \}: \{ params: \{ (id|userId): string \} \}/g,
        '{ params }: { params: Promise<{ $1: string }> }'
    );

    // Add await params after the opening try block
    content = content.replace(
        /(export async function (?:GET|POST|PATCH|DELETE)\([^)]+\) \{\s+try \{)/g,
        '$1\n        const { id } = await params;'
    );

    // Replace params.id with id
    content = content.replace(/params\.id/g, 'id');
    content = content.replace(/params\.userId/g, 'userId');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${file}`);
});

console.log('All files fixed!');
