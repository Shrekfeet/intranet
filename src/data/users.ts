/**
 * Team user accounts.
 *
 * To add a user:
 *   1. Choose a username (lowercase, no spaces) and a password
 *   2. Generate the SHA-256 hash of the password:
 *      - Node: node -e "require('crypto').createHash('sha256').update('yourpassword').digest('hex') |> console.log"
 *      - Or open the browser console on any page and run:
 *        crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourpassword'))
 *          .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
 *   3. Add an entry below and commit the file.
 *
 * To reset a password: generate a new hash and replace the old one.
 */

export interface TeamUser {
  id: string;
  name: string;
  passwordHash: string;
  isAdmin?: boolean;
}

export const teamUsers: TeamUser[] = [
  {
    id: "harry",
    name: "Harry",
    passwordHash: "f32b4efb67b019f4b41313c8119312548ed29f7852b9eea9fd73962a255c7d67",
    isAdmin: true,
  },
  {
    id: "joey",
    name: "Joey",
    passwordHash: "8ff1e8a11c8270b48dd16733148e3f3b515363d0a1e6b68e0b876055f894f34e",
  },
  {
    id: "chris",
    name: "Chris",
    passwordHash: "e5a4e50c92c6cafbafd4d5df695d979841f3575b2b43c498f44fc91123a998c5",
  },
  {
    id: "ian",
    name: "Ian",
    passwordHash: "764066ed9e08ff84293111f76f57936ccf1e5bf299483db9a30163929deb494a",
  },
  {
    id: "dave",
    name: "Dave",
    passwordHash: "c060f61a545bfca81fe2c974280206b5362454110667c7adbbeaa3e243194b9e",
  },
  {
    id: "casey",
    name: "Casey",
    passwordHash: "4c0f6b91a03f6795b0fbe591a2f8664ad0f2dc6bda2b043936fb0bf8eee3f7e7",
  },
  {
    id: "noah",
    name: "Noah",
    passwordHash: "5808a983bce721b6b662be6a15fb87ba9c8de56d1fc1c5876849475a83d77928",
  },
  {
    id: "will",
    name: "Will",
    passwordHash: "4593b367a9733356ce944548e6c9dbb164b53147535633b7b8e5cdab7268c310",
  },
  // Add your team members below, e.g.:
  // {
  //   id: "alice",
  //   name: "Alice",
  //   passwordHash: "<sha256 of their password>",
  // },
];

export function findUser(id: string): TeamUser | undefined {
  return teamUsers.find((u) => u.id === id);
}
