import { User, ChoreData } from '../types';

export const initialUsers: User[] = [
  {
    id: 'dad',
    name: 'Dad',
    avatar: 'https://placehold.co/60x60/4A90E2/FFFFFF?text=Dad',
    totalPoints: 0
  },
  {
    id: 'mom',
    name: 'Mom',
    avatar: 'https://placehold.co/60x60/E94B3C/FFFFFF?text=Mom',
    totalPoints: 0
  },
  {
    id: 'child1',
    name: 'Alex',
    avatar: 'https://placehold.co/60x60/50C878/FFFFFF?text=Alex',
    totalPoints: 0
  },
  {
    id: 'child2',
    name: 'Sam',
    avatar: 'https://placehold.co/60x60/FFB347/FFFFFF?text=Sam',
    totalPoints: 0
  }
];

export const choreData: ChoreData[] = [
  {
    title: 'PERSONAL RESPONSIBILITY',
    color: '#9E9E9E',
    chores: [
      { id: 'personal-1', name: 'PUT THINGS AWAY IN PROPER PLACE', points: 5 },
      { id: 'personal-2', name: 'PICK UP AFTER YOURSELF', points: 5 },
      { id: 'personal-3', name: 'TAKE SCHOOL SUPPLIES TO SCHOOL', points: 10 },
      { id: 'personal-4', name: 'BE NICE TO SIBLINGS', points: 10 },
      { id: 'personal-5', name: 'SET UP BACKPACK 5 POINTS', points: 5 },
      { id: 'personal-6', name: 'ASK IF YOU NEED ANYTHING', points: 5 },
      { id: 'personal-7', name: 'TAKE SOMEONE A TOWEL OR SOMETHING THEY NEED', points: 10 },
      { id: 'personal-8', name: 'TAKE SOMETHING UPSTAIRS THAT BELONGS UPSTAIRS', points: 5 },
      { id: 'personal-9', name: 'PUT SOMETHING BACK 5 POINTS', points: 5 }
    ]
  },
  {
    title: 'BOYS ROOM DAILY',
    color: '#9C27B0',
    chores: [
      { id: 'boys-1', name: 'GATHER TOYS 15 POINTS', points: 15 },
      { id: 'boys-2', name: 'GATHER GARBAGE 15 POINTS', points: 15 },
      { id: 'boys-3', name: 'GATHER LAUNDRY 15 POINTS', points: 15 },
      { id: 'boys-4', name: 'VACUUM 25 POINTS', points: 25 },
      { id: 'boys-5', name: 'MAKE BEDS 15 POINTS', points: 15 },
      { id: 'boys-6', name: 'PUT AWAY CLOTHES 15 POINTS', points: 15 },
      { id: 'boys-7', name: 'GET BACKPACK AND BELT FOR OUTSIDE 15 POINTS', points: 15 },
      { id: 'boys-8', name: 'WIPE AND CLEAN UP AS NEEDED 15 POINTS', points: 15 },
      { id: 'boys-9', name: 'BONUS POINTS 5 POINTS', points: 5 }
    ]
  },
  {
    title: 'KITCHEN, ENTRY, DINING ROOM 5 TIMES A WEEK',
    color: '#FF5722',
    chores: [
      { id: 'kitchen-1', name: 'SWEEP KITCHEN 15 POINTS', points: 15 },
      { id: 'kitchen-2', name: 'PUT DISHES AWAY 15 POINTS', points: 15 },
      { id: 'kitchen-3', name: 'LOAD DISHES 15 POINTS', points: 15 },
      { id: 'kitchen-4', name: 'CLEAN COUNTERTOPS 15 POINTS', points: 15 },
      { id: 'kitchen-5', name: 'SET TABLE 10 POINTS', points: 10 },
      { id: 'kitchen-6', name: 'CLEAN STOVETOP 15 POINTS', points: 15 },
      { id: 'kitchen-7', name: 'WIPE MICROWAVE DOWN 10 POINTS', points: 10 },
      { id: 'kitchen-8', name: 'EMPTY TRASH 10 POINTS', points: 10 },
      { id: 'kitchen-9', name: 'VACUUM ENTRY AND DINING ROOM 25 POINTS', points: 25 },
      { id: 'kitchen-10', name: 'ORGANIZE SHOES DAILY 10 POINTS', points: 10 },
      { id: 'kitchen-11', name: 'ORGANIZE SHOES ONCE A WEEK 20 POINTS', points: 20 }
    ]
  },
  {
    title: 'PARENTS ROOM 2 TIMES A WEEK',
    color: '#4CAF50',
    chores: [
      { id: 'parents-1', name: 'GATHER TOYS 15 POINTS', points: 15 },
      { id: 'parents-2', name: 'GATHER GARBAGE 15 POINTS', points: 15 },
      { id: 'parents-3', name: 'GATHER LAUNDRY 15 POINTS', points: 15 },
      { id: 'parents-4', name: 'VACUUM 25 POINTS', points: 25 },
      { id: 'parents-5', name: 'MAKE BEDS 5 POINTS', points: 5 },
      { id: 'parents-6', name: 'PUT AWAY CLOTHES 20 POINTS', points: 20 },
      { id: 'parents-7', name: 'LUNCH AND BAGS CHECKED FOR NEXT PREP 15 POINTS', points: 15 }
    ]
  },
  {
    title: 'BOYS BATHROOM 3 TIMES A WEEK',
    color: '#2196F3',
    chores: [
      { id: 'boys-bath-1', name: 'GATHER TOYS 25 POINTS', points: 25 },
      { id: 'boys-bath-2', name: 'GATHER GARBAGE 25 POINTS', points: 25 },
      { id: 'boys-bath-3', name: 'GATHER LAUNDRY 25 POINTS', points: 25 },
      { id: 'boys-bath-4', name: 'SWEEP AND MOP 30 POINTS', points: 30 },
      { id: 'boys-bath-5', name: 'TOILET WASHED 25 POINTS', points: 25 },
      { id: 'boys-bath-6', name: 'COUNTER AND MIRROR WASHED 30 POINTS', points: 30 },
      { id: 'boys-bath-7', name: 'BATHTUB WASHED 50 POINTS', points: 50 }
    ]
  },
  {
    title: 'PARENTS BATHROOM 2 TIMES A WEEK',
    color: '#E91E63',
    chores: [
      { id: 'parents-bath-1', name: 'GATHER TOYS 25 POINTS', points: 25 },
      { id: 'parents-bath-2', name: 'GATHER GARBAGE 25 POINTS', points: 25 },
      { id: 'parents-bath-3', name: 'GATHER LAUNDRY 25 POINTS', points: 25 },
      { id: 'parents-bath-4', name: 'SWEEP AND MOP 30 POINTS', points: 30 },
      { id: 'parents-bath-5', name: 'TOILET WASHED 25 POINTS', points: 25 },
      { id: 'parents-bath-6', name: 'COUNTER AND MIRROR WASHED 30 POINTS', points: 30 },
      { id: 'parents-bath-7', name: 'BATHTUB WASHED 50 POINTS', points: 50 }
    ]
  },
  {
    title: 'LAUNDRY ROOM 1 TIME A WEEK W/ DAILY LOAD BONUS',
    color: '#00BCD4',
    chores: [
      { id: 'laundry-1', name: 'CLEAN LINT GARBAGE 25 POINTS', points: 25 },
      { id: 'laundry-2', name: 'GATHER GARBAGE 15 POINTS', points: 15 },
      { id: 'laundry-3', name: 'SORT LAUNDRY 15 POINTS', points: 15 },
      { id: 'laundry-4', name: 'SWEEP/MOP 30 POINTS', points: 30 },
      { id: 'laundry-5', name: 'BEDDING DONE ONCE A WEEK 25 POINTS FOR EACH BED', points: 25 },
      { id: 'laundry-6', name: 'COMPLETED AT LEAST 2 LOADS DAILY WITH AT LEAST FOLDING INTO BASKETS 20 POINTS ADDITIONAL 5 POINTS FOR EACH LOAD COMPLETED', points: 20 }
    ]
  },
  {
    title: 'LIVING ROOM 2 TIMES A WEEK',
    color: '#F44336',
    chores: [
      { id: 'living-1', name: 'GATHER TOYS 15 POINTS', points: 15 },
      { id: 'living-2', name: 'GATHER GARBAGE 15 POINTS', points: 15 },
      { id: 'living-3', name: 'GATHER LAUNDRY 15 POINTS', points: 15 },
      { id: 'living-4', name: 'VACUUM/SWEEP 25 POINTS 30 POINTS FOR MOP', points: 25 }
    ]
  },
  {
    title: 'HALLWAY 2 TIMES A WEEK',
    color: '#3F51B5',
    chores: [
      { id: 'hallway-1', name: 'GATHER TOYS 15 POINTS', points: 15 },
      { id: 'hallway-2', name: 'GATHER GARBAGE 15 POINTS', points: 15 },
      { id: 'hallway-3', name: 'GATHER LAUNDRY 15 POINTS', points: 15 },
      { id: 'hallway-4', name: 'VACUUM/SWEEP 25 POINTS', points: 25 }
    ]
  },
  {
    title: 'CAR ONCE A WEEK',
    color: '#795548',
    chores: [
      { id: 'car-1', name: 'GATHER TOYS 15 POINTS', points: 15 },
      { id: 'car-2', name: 'GATHER GARBAGE 15 POINTS', points: 15 },
      { id: 'car-3', name: 'GATHER LAUNDRY 15 POINTS', points: 15 },
      { id: 'car-4', name: 'VACUUM 25 POINTS', points: 25 },
      { id: 'car-5', name: 'CHECKED OFF BY:', points: 0 }
    ]
  }
];
