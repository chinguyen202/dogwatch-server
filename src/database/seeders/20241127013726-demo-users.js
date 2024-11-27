'use strict';
const { v4: uuidv4 } = require('uuid');
const argon2 = require('argon2');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    try {
      let password = await argon2.hash('password');
      return await queryInterface.bulkInsert('users', [
        {
          uuid: uuidv4(),
          firstName: 'Robert',
          lastName: 'Harris',
          email: 'robert.harris@example.com',
          password,
          location: 'Helsinki',
          role: 'owner',
          headline: 'Father of Oscar, a 6 year old Labrador',
          description:
            'Oscar is a water-loving Labrador who enjoys swimming and retrieving sticks. He requires a consistent joint supplement regimen to maintain mobility. Oscar is friendly, obedient, and comfortable around kids. His diet includes kibble enriched with fish oil for joint health. I am looking for a person who can sit overnight with Oscar and have playtime and swimming opportunities. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Mark',
          lastName: 'Robinson',
          email: 'mark.robinson@example.com',
          password,
          location: 'Helsinki',
          role: 'owner',
          headline: 'Father of Max, a 4 year old German Shepherd',
          description:
            'Max is a highly intelligent and energetic German Shepherd, best suited to active environments. He enjoys agility training and fetching games, requiring a structured schedule to maintain his energy levels. Max is protective but well-trained around family members and strangers. He follows a strict grain-free diet to prevent digestive issues and consumes a mix of raw meat and high-quality grain-free kibble. I am looking for a person who can help with dog walking with emphasis on exercise and training during walks. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Oliver',
          lastName: 'Grant',
          email: 'oliver.grant@example.com',
          password,
          location: 'Espoo',
          role: 'owner',
          headline: 'Father of Lord, a 6 year old Doberman Pinscher',
          description:
            'Lord is a loyal and protective Doberman who has undergone extensive training for obedience and socialization. He enjoys structured exercise routines and mental challenges, such as tracking exercises and obstacle courses. While he can appear intimidating, Lord is affectionate and playful with those he trusts. His diet includes a high-protein kibble mix with occasional meat supplements to maintain his lean muscle mass. Lord is needed an overnight sitting with training and exercise routines. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Emily',
          lastName: 'Taylor',
          email: 'emily.taylor@example.com',
          password,
          location: 'Espoo',
          role: 'owner',
          headline: 'Mom of Nala, a 1 year old Rottweiler',
          description:
            'Nala is a small but powerful rottweiler who is affectionate with known individuals but careful with strangers. Her training is ongoing, and she thrives with positive reinforcement methods. Nala’s diet includes raw meat and high-protein kibble.I am looking for dog walking with training reinforcement. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Anna',
          lastName: 'Salminen',
          email: 'anna.salminen@example.com',
          password,
          location: 'Vantaa',
          role: 'owner',
          headline: 'Mom of Shadow',
          description:
            'Shadow is a senior dog who has limited mobility and requires daily medication. He enjoys calm environments and follows a soft food diet to aid his digestion. Overnight sitting with care for medication administration is needed for Shadow. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Michelle',
          lastName: 'White',
          email: 'michelle.white@example.com',
          password,
          location: 'Vantaa',
          role: 'owner',
          headline: 'Mom of Coco',
          description:
            'Aperol is a spirited and vocal dog with a fluffy coat, often drawing attention due to his playful antics and expressive personality. He is known to be intelligent but can be stubborn at times. Aperol loves long walks, particularly in wooded areas, where he can explore and sniff around. He needs frequent grooming to keep his thick fur from matting and shedding. Aperol is on a grain-free kibble diet to manage sensitive digestion. I am looking for a person who can do dog walking with emphasis on social interaction and exploration. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Ben',
          lastName: 'Harris',
          email: 'ben.harris@example.com',
          password,
          location: 'Espoo',
          role: 'owner',
          headline: 'Father of Finn, a 3 year old Border Collie',
          description:
            'Finn is a working dog who excels in agility and obedience training. He thrives with consistent exercise and mental challenges. Finn enjoys cheese as a treat but follows a balanced kibble diet. Day care with structured agility training is required for Finn when I am away. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Daniel',
          lastName: 'Thompson',
          email: 'daniel.thompson@example.com',
          password,
          location: 'Vantaa',
          role: 'owner',
          headline: 'Father of Rocky and Apollo ',
          description:
            'Rocky is a strong, athletic, and confident American Bulldog who enjoys rough-and-tumble play. He thrives on structured routines and responds well to positive reinforcement training. Rocky loves being outdoors and needs plenty of exercise to stay fit. His diet includes a mix of raw food and high-quality kibble. Apollo is more relaxed and gentler compared to Rocky but equally affectionate. He prefers lounging around and getting belly rubs but will join in for a spirited run or game of tug-of-war. Apollo tends to gain weight easily, so his diet is carefully portioned with low-calorie treats.I need a day care for both dogs, with plenty of playtime, exercise, and opportunities for socialization. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Li',
          lastName: 'Wei',
          email: 'li.wei@example.com',
          password,
          location: 'Helsinki',
          role: 'owner',
          headline: 'Mom of Luna',
          description:
            'Luna is a lively Husky who thrives in colder climates and loves pulling sleds and long hikes. She needs daily mental stimulation through puzzle games and training challenges. Luna is known to escape fenced areas and needs a secure environment when left alone. Her diet consists of raw meat mixed with vegetables, reflecting her natural appetite.I am looking for an overnight sitting service during family vacations and extended trips. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Julia',
          lastName: 'Smith',
          email: 'julia.smith@example.com',
          password,
          location: 'Espoo',
          role: 'owner',
          headline: 'Mom of Buddy',
          description:
            'Buddy is an energetic and playful golden retriever who thrives on outdoor activities. He needs at least 90 minutes of exercise daily, split between morning and evening walks, along with play sessions at the dog park. Buddy is very sociable but experiences anxiety during thunderstorms and fireworks, requiring extra comforting care and a safe space indoors. He follows a regular kibble diet with occasionally healthy treats like carrots and apples. I am looking for an overnight sitting for Buddy when I am traveling for work. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Emma',
          lastName: 'Karjalainen',
          email: 'Emma.karjalainen@example.com',
          password,
          location: 'Vantaa',
          role: 'owner',
          headline: 'Mom of Chico',
          description:
            'Chico is a small but spirited Chihuahua who enjoys lap time and gentle indoor games. He is wary of new people and can be defensive if approached suddenly. Chico is accustomed to a predictable daily routine and prefers small walks around familiar areas. He does not have special dietary requirements but is sensitive to new foods and must stick to his small-breed kibble. Day care services is needed for Chico to ensure he has company while I work long shifts. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Emily',
          lastName: 'Nieminen',
          email: 'emily.nieminen@example.com',
          password,
          location: 'Helsinki',
          role: 'owner',
          headline: 'Mom of Charlie',
          description:
            'Charlie is a sweet and affectionate Cavalier King Charles spaniel who thrives on human companionship. He is known for his friendly demeanor, making him a favorite among both children and adults. Charlie enjoys leisurely walks in the park, cuddling on the couch, and interacting with other small dogs. He has a gentle temperament but can be prone to separation anxiety if left alone for extended periods. Charlie is on a special diet of grain-free kibble mixed with wet food to manage mild food sensitivities. Regular grooming is necessary to keep his beautiful, silky coat tangle-free. I would like to find a person who can do day care or overnight sitting with lots of human interaction, playtime, and gentle care to manage his anxiety and maintain his routine. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Pekka',
          lastName: 'Korhonen',
          email: 'pekka.korhonen@example.com',
          password,
          location: 'Espoo',
          role: 'owner',
          headline: 'Dad of Daisy',
          description:
            'Daisy is a gentle and affectionate cocker spaniel who loves curling up on the sofa and enjoys being around calm people. She gets stressed in crowded or noisy areas and prefers quiet walks. Daisy diet excludes chicken due to allergies, and she primarily consumes lamb-based dry food. I am looking for a dog walk service when I am travelling on weekends. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Heini',
          lastName: 'Laine',
          email: 'heini.laine@example.com',
          password,
          location: 'Vantaa',
          role: 'owner',
          headline: 'Mom of Milo',
          description:
            'Milo is a fun-loving and highly adaptable mixed breed with an energetic spirit. He enjoys running, playing fetch, and making new dog friends. Milo is known for his friendly disposition, making him a hit at dog parks. He eats a balanced kibble diet with fish oil supplements for a shiny coat. Milo tends to get bored easily, so interactive toys are essential during playtime. I am looking for a person to have a day care to keep Milo active and engaged when I am at work. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Alina',
          lastName: 'Johnson',
          email: 'alina.johnson@example.com',
          password,
          location: 'Helsinki',
          role: 'sitter',
          headline:
            'A part-time veterinary science student with a passion for animal care',
          description:
            'Hi! I’m Alina. For the past five years, I’ve dedicated myself to dog-sitting, especially for dogs with medical needs or anxiety. My services include dog walking, overnight stays, and day care, all tailored to meet your pet’s specific needs. I am experienced with medication administration, basic training, and creating calming routines for anxious pups. I love outdoor adventures and make sure every dog I care for gets plenty of exercise and attention! ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Michaela',
          lastName: 'O’Reilly',
          email: 'michaela.oreilly@example.com',
          password,
          location: 'Helsinki',
          role: 'sitter',
          headline:
            'Remote worker who loves dogs of all sizes, especially large breeds',
          description:
            'I’m Michaela. With a strong background in obedience training, I offer overnight stays and day care. I’m known for providing consistent, attentive care, ensuring every dog receives ample affection and mental stimulation. Your pet’s happiness and comfort are my top priorities. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Priya',
          lastName: 'Patel,',
          email: 'priya.patel@example.com',
          password,
          location: 'Helsinki',
          role: 'sitter',
          headline: 'A pet lover with five years of experience',
          description:
            'Hi, I’m Priya! As a pet lover with five years of experience, I focus on caring for small and medium-sized breeds. I offer dog walking and day care services. I’m particularly skilled at working with shy or anxious pups, providing a patient and reassuring atmosphere. Building trust and creating a stress-free environment is what I do best. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Annika',
          lastName: 'Laitinen',
          email: 'annika.laitinen@example.com',
          password,
          location: 'Helsinki',
          role: 'sitter',
          headline: 'Experiences with volunteering at dog shelters',
          description:
            'Hello, I’m Annika, and I’ve been volunteering at dog shelters and pet-sitting for four years. I provide overnight stays and day care, with a focus on senior dogs and those needing extra care. I’m patient, nurturing, and committed to making every pet feel loved and cared for. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Ethan',
          lastName: 'Davis',
          email: 'ethan.davis@example.com',
          password,
          location: 'Helsinki',
          role: 'sitter',
          headline: 'A professional dog trainer with five years of experience',
          description:
            'I’m Ethan. My services include dog walking, day care, overnight sitting, and customized training plans. I specialize in obedience and behavior modification, providing a balanced mix of discipline, play, and affection to ensure your pet’s well-being and happiness. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Jaana',
          lastName: 'Rantanen',
          email: 'jaana.rantanen@example.com',
          password,
          location: 'Espoo',
          role: 'sitter',
          headline:
            'An experienced dog walker with six years of daily dog-walking experience.',
          description:
            'Hey, I’m Jaana. I specialize in high-energy dogs and ensure every outing is full of engaging walks and play. I offer both dog walking and day care, promising a tired and content pet by the end of each day. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Mia',
          lastName: 'Suomalainen ',
          email: 'mia.suomalainen @example.com',
          password,
          location: 'Espoo',
          role: 'sitter',
          headline: 'A former zookeeper with a deep love for animals',
          description:
            'Hello, I’m Mia. I’ve been pet-sitting for three years and offer overnight stays and day care. I am comfortable with all breeds, including dogs with special needs. I focus on nutrition, exercise, and engaging enrichment to keep every pup happy and healthy. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Jamal',
          lastName: 'Singh ',
          email: 'jamal.singh @example.com',
          password,
          location: 'Espoo',
          role: 'sitter',
          headline: 'A fitness enthusiast',
          description:
            'Hey, I’m Jamal, a fitness enthusiast who loves combining my passion for running and cycling with dog-sitting. I provide dog walking and day care services, especially for energetic or working breeds. Whether it’s a brisk jog or a long trail hike, I make sure your pup stays active, healthy, and stimulated. I tailor exercise routines to fit your dog’s personality and energy level. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Laura',
          lastName: 'Benson',
          email: 'laura.benson@example.com',
          password,
          location: 'Espoo',
          role: 'sitter',
          headline:
            'A retired teacher with over a decade of dog-sitting experience',
          description:
            'Hello, I’m Laura. Animals have always been my greatest joy, and I love providing consistent care and structured routines to keep your furry family members comfortable and happy. I offer day care and overnight sitting services, focusing on creating a calm, loving environment perfect for older dogs or those with special needs. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Chloe',
          lastName: 'Ramirez',
          email: 'chloe.ramirez@example.com',
          password,
          location: 'Espoo',
          role: 'sitter',
          headline:
            'A freelance graphic designer and dedicated dog sitter for over three years',
          description:
            'Hi there! I’m Chloe, a freelance graphic designer and dedicated dog sitter for over three years. I specialize in overnight sitting, day care, and providing basic training assistance. I love keeping dogs engaged with interactive play and positive reinforcement. I create a calming, interactive environment where dogs feel safe and happy, whether it’s cuddling at home or romping in the park. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Ryan',
          lastName: 'Lee',
          email: 'ryan.lee@example.com',
          password,
          location: 'Vantaa',
          role: 'sitter',
          headline: 'Professional animal care experience',
          description:
            'Hello! I’m Ryan, and I’ve spent three years working at an animal shelter, giving me professional animal care experience. I offer dog walking, day care, and overnight stays, with a specialization in working with rescue dogs or those facing behavioral challenges. I ensure a balance of structured play, enrichment activities, and bonding time with your pet. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Jasmine',
          lastName: 'Liu',
          email: 'jasmine.liu@example.com',
          password,
          location: 'Vantaa',
          role: 'sitter',
          headline: 'A pet behaviorist with a passion for helping dogs',
          description:
            'Hi! I’m Jasmine, a pet behaviorist with a passion for helping dogs feel at ease in new settings. My services include overnight sitting, dog walking, and behavior consultations. Using positive reinforcement and calming techniques, I make sure every dog feels safe, comfortable, and happy. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Sofia',
          lastName: 'Martinez',
          email: 'sofia.martinez@example.com',
          password,
          location: 'Vantaa',
          role: 'sitter',
          headline: 'A lifelong dog lover',
          description:
            'I’m Sofia, a university student and a lifelong dog lover. I have years of experience dog-sitting for family and friends. I offer dog walking and day care services with a focus on small adventures and playtime in local parks. I’m energetic, friendly, and always ready to keep your puppy happy and well cared for. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Amira',
          lastName: 'Noor',
          email: 'amira.noor@example.com',
          password,
          location: 'Vantaa',
          role: 'sitter',
          headline: 'A pet lover and part-time photographer',
          description:
            'Hi, I’m Amira, a pet lover and part-time photographer. I provide dog walking, day care, and even pet photoshoots! I have a soft spot for small dogs and puppies. Your furry friend will enjoy playful adventures in the park, and you’ll have beautiful memories captured through my lens. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: uuidv4(),
          firstName: 'Mary',
          lastName: 'Brown',
          email: 'mary.brown@example.com',
          password,
          location: 'Vantaa',
          role: 'sitter',
          headline: 'A dog enthusiast',
          description:
            'Hi, I’m Mary, a dog enthusiast who offers dog-sitting services on weekends while working full-time. I specialize in overnight sitting and dog walking. I’m comfortable with multiple breeds and provide structured routines, plenty of playtime, and affection for every dog I care for. ',
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log(`ERROR WHEN SEEDING USERS: ${error}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};