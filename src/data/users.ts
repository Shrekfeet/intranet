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
    // Change this hash — it is the SHA-256 of "changeme"
    passwordHash: "057ba03d6c44104863dc7361fe4578965d1887360f90a0895882e58a6248fc86",
    isAdmin: true,
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
