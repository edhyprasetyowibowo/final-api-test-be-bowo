import { PrismaClient, User, Role } from '@prisma/client';
import * as bcrypt from '@node-rs/bcrypt';


const prisma = new PrismaClient();

async function main(): Promise<void> {

  // create roles
  const role = {
    id: 'fafeeb2e-4783-424f-b220-321954cefb66',
    name: 'admin',
  } satisfies Omit<Role, 'createdAt' | 'updatedAt' | 'deletedAt'>;

  if ((await prisma.role.count({ where: { id: role.id } })) == 0) {
    await prisma.role.create({
      data: role,
    });
  }
  const hashedPassword = await bcrypt.hash('testing123', 10);
  // Create admin user
  const user = {
    id: 'fafeeb2e-4783-424f-b220-321954cefb66',
    email: 'admin@test.com',
    password: hashedPassword,
    username: 'admin',
    fullName: 'admin',
    role_id: 'fafeeb2e-4783-424f-b220-321954cefb66',
  } satisfies Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt'>;

  if ((await prisma.user.count({ where: { id: user.id } })) == 0) {
    await prisma.user.create({
      data: user,
    });
  }

  // Create blog posts
  await prisma.blog.createMany({
    data: [
      {
        title: 'First Blog Post',
        content: 'This is the content of the first blog post.',
        author: 'John Doe',
        imageUrl: 'https://via.placeholder.com/800x400?text=First+Blog+Image',
      },
      {
        title: 'Second Blog Post',
        content: 'This is the content of the second blog post.',
        author: 'Jane Doe',
        imageUrl: 'https://via.placeholder.com/800x400?text=Second+Blog+Image',
      },
      {
        title: 'Third Blog Post',
        content: 'This is the content of the third blog post.',
        author: 'John Smith',
        imageUrl: 'https://via.placeholder.com/800x400?text=Third+Blog+Image',
      },
      {
        title: 'Fourth Blog Post',
        content: 'This is the content of the fourth blog post.',
        author: 'Alice Johnson',
        imageUrl: 'https://via.placeholder.com/800x400?text=Fourth+Blog+Image',
      },
      {
        title: 'Fifth Blog Post',
        content: 'This is the content of the fifth blog post.',
        author: 'Chris Lee',
        imageUrl: 'https://via.placeholder.com/800x400?text=Fifth+Blog+Image',
      },
      {
        title: 'Sixth Blog Post',
        content: 'This is the content of the sixth blog post.',
        author: 'Laura Davis',
        imageUrl: 'https://via.placeholder.com/800x400?text=Sixth+Blog+Image',
      },
      {
        title: 'Seventh Blog Post',
        content: 'This is the content of the seventh blog post.',
        author: 'Michael Brown',
        imageUrl: 'https://via.placeholder.com/800x400?text=Seventh+Blog+Image',
      },
      {
        title: 'Eighth Blog Post',
        content: 'This is the content of the eighth blog post.',
        author: 'Samantha White',
        imageUrl: 'https://via.placeholder.com/800x400?text=Eighth+Blog+Image',
      },
      {
        title: 'Ninth Blog Post',
        content: 'This is the content of the ninth blog post.',
        author: 'Daniel Harris',
        imageUrl: 'https://via.placeholder.com/800x400?text=Ninth+Blog+Image',
      },
      {
        title: 'Tenth Blog Post',
        content: 'This is the content of the tenth blog post.',
        author: 'Natalie Green',
        imageUrl: 'https://via.placeholder.com/800x400?text=Tenth+Blog+Image',
      },
    ],
  });

  //create faq
  await prisma.faq.createMany({
    data: [
      {
        question: 'How to buy a ticker?',
        answer: 'To buy a ticker, visit the website and select your desired ticker. Then, click on the "Buy Now" button and complete the checkout process.',
      },
      {
        question: 'Any maximum ticket to purchase?',
        answer: 'There is no maximum limit on the number of tickets you can purchase. However, large orders may require approval depending on availability.',
      },
      {
        question: 'How do I check the status of my purchase?',
        answer: 'You can check your purchase status by logging into your account and navigating to the "My Orders" section.',
      },
      {
        question: 'Can I modify my order after purchasing?',
        answer: 'Once an order is confirmed, modifications cannot be made. If you need assistance, please contact customer support.',
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept payments through credit card, PayPal, and bank transfer. Please select your preferred method during checkout.',
      },
      {
        question: 'Do you offer refunds?',
        answer: 'Refunds are available within 30 days of purchase, provided the ticket has not been used or redeemed.',
      },
      {
        question: 'What happens if my ticket expires?',
        answer: 'If your ticket expires, it will no longer be valid, and you will need to purchase a new one.',
      },
      {
        question: 'How do I transfer a ticket to someone else?',
        answer: 'To transfer a ticket, go to your order page and click on "Transfer". You will be asked to enter the recipient\'s details.',
      },
      {
        question: 'Is there a discount for bulk purchases?',
        answer: 'Yes, we offer discounts for bulk purchases. Please contact customer support for more details.',
      },
      {
        question: 'Can I purchase tickets for events outside of my region?',
        answer: 'Yes, you can purchase tickets for events worldwide. Ensure that the event allows international buyers before proceeding with the purchase.',
      },
    ],
  });

  await prisma.$disconnect();

  process.exit(0);
}

main();
