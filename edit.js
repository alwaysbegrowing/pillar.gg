const bodys = [
  {
    Name: 'Aranya Breaw',
    Email: 'abreaw@appleone.com',
    Branch: 'AppleOne Technical Staffing Orlando',
  },
  {
    Name: 'Angela Camacho',
    Email: 'acamacho@appleone.com',
    Branch: 'Orange',
  },
  {
    Name: 'Amber Clark',
    Email: 'aclark@appleone.com',
    Branch: 'Las Colinas',
  },
  {
    Name: 'Amber Clark',
    Email: 'aclark@appleone.com',
    Branch: 'Las Colinas',
  },
  {
    Name: 'Amber Clark',
    Email: 'aclark@mail.all-in-1.com',
    Branch: 'Las Colinas',
  },
  {
    Name: 'Alexandra Costea',
    Email: 'acostea@appleone.com',
    Branch: 'Kent',
  },
  {
    Name: 'Adam Black',
    Email: 'adamb@appleone.com',
    Branch: 'Temecula',
  },
  {
    Name: 'Anna DiJenno',
    Email: 'adijenno@appleone.com',
    Branch: 'Greenville',
  },
  {
    Name: 'Angela Downing',
    Email: 'adowning@appleone.com',
    Branch: 'Downtown L.A.',
  },
  {
    Name: "Austin D'Souza",
    Email: 'adsouza@appleone.com',
    Branch: 'Canada • Brampton',
  },
  {
    Name: "Austin D'Souza",
    Email: 'adsouza@appleone.com',
    Branch: 'Canada • Brampton',
  },
  {
    Name: 'Alexander Ferrufino',
    Email: 'AFerrufino@appleone.com',
    Branch: 'Canada • Brampton',
  },
  {
    Name: 'Alicia Filman',
    Email: 'afilman@appleone.com',
    Branch: 'Canada • Burlington',
  },
  {
    Name: 'Allison Hamlin',
    Email: 'ahamlin@appleone.com',
    Branch: 'Santa Barbara',
  },
  {
    Name: 'account Manager',
    Email: 'ahoepner@appleone.com',
    Branch: 'Las Vegas II - West Sahara ',
  },
  {
    Name: 'Alma Martinez',
    Email: 'ajmartinez@appleone.com',
    Branch: 'Downtown L.A.',
  },
  {
    Name: 'Alyssa Krieger',
    Email: 'akrieger@appleone.com',
    Branch: 'Long Beach',
  },
  {
    Name: 'Aleksy Fernandez',
    Email: 'aleksyf@appleone.com',
    Branch: 'Upland',
  },
  {
    Name: 'Alexandra Anderson',
    Email: 'alexandraa@appleone.com',
    Branch: 'Santa Barbara',
  },
  {
    Name: 'Alexis Lopez',
    Email: 'allopez@appleone.com',
    Branch: 'Oxnard',
  },
  {
    Name: 'Alyssa Schoneboom',
    Email: 'alyssas@ain1.com',
    Branch: 'HRCG - 8823',
  },
  {
    Name: 'Ann Macaulay',
    Email: 'amacaulay@act-1.com',
    Branch: 'Fresno',
  },
  {
    Name: 'Ayra Malik',
    Email: 'amalik@appleone.com',
    Branch: 'Canada • North York',
  },
  {
    Name: 'Anne Marie Marivoet',
    Email: 'amarivoet@mail.all-in-1.com',
    Branch: 'Chesapeake',
  },
  {
    Name: 'ashley harris',
    Email: 'amharris@allsourcepps.com',
    Branch: 'AllSource PPS - 8688',
  },
  {
    Name: 'Alison Mowry',
    Email: 'amowry@appleone.com',
    Branch: 'Bellevue',
  },
  {
    Name: 'Amit Singh',
    Email: 'amsingh@appleone.com',
    Branch: 'Canada • Brampton',
  },
  {
    Name: 'Amy Johnson',
    Email: 'amyjohnson@appleone.com',
    Branch: 'South Carolina Government',
  },
  {
    Name: 'Anjela Davis',
    Email: 'anjelad@appleone.com',
    Branch: 'Boulder',
  },
  {
    Name: 'Angelica Ramos',
    Email: 'anramos@appleone.com',
    Branch: 'Las Colinas',
  },
  {
    Name: 'Alyse Parrino',
    Email: 'aparrino@appleone.com',
    Branch: 'San Francisco',
  },
  {
    Name: 'ashley pearson',
    Email: 'apearson@appleone.com',
    Branch: 'Corona',
  },
  {
    Name: 'Ashley peeler',
    Email: 'apeeler@appleone.com',
    Branch: 'Ventura',
  },
  {
    Name: 'Adriana Pickard',
    Email: 'apickard@appleone.com',
    Branch: 'Ontario',
  },
  {
    Name: 'Anais Rabaca',
    Email: 'arabaca@bilingualone.ca',
    Branch: 'Canada • BilingualOne, West Toronto',
  },
  {
    Name: 'Annamaria Rimicci',
    Email: 'arimicci@appleone.com',
    Branch: 'Westwood',
  },
  {
    Name: 'Armohn Jackson',
    Email: 'arjackson@appleone.com',
    Branch: 'San Francisco',
  },
  {
    Name: 'Ali Rubio',
    Email: 'arubio@appleone.com',
    Branch: 'Tampa',
  },
  {
    Name: 'Ashley Reese',
    Email: 'ashleyr@allswell.com',
    Branch: "All's Well - Columbia",
  },
  {
    Name: 'Ashley Siwek',
    Email: 'asiwek@appleone.com',
    Branch: 'AppleOne Peoria',
  },
  {
    Name: 'Aspen Cruz',
    Email: 'aspenc@appleone.com',
    Branch: 'King of Prussia',
  },
  {
    Name: 'Armina Suque',
    Email: 'asuque@appleone.com',
    Branch: 'Long Beach',
  },
  {
    Name: 'Acquella Todd',
    Email: 'atodd@appleone.com',
    Branch: 'Santa Clara',
  },
  {
    Name: 'April Valdepena',
    Email: 'avaldepena@appleone.com',
    Branch: 'Chesapeake',
  },
  {
    Name: 'Alana Venegas',
    Email: 'avenegas@appleone.com',
    Branch: 'Sacramento',
  },
  {
    Name: 'Adriana  Vera ',
    Email: 'avera@act-1.com',
    Branch: 'Fremont',
  },
  {
    Name: 'Adriana  Vera ',
    Email: 'avera@appleone.com',
    Branch: 'Fremont',
  },
  {
    Name: 'Barbara Collins',
    Email: 'bcollins@appleone.com',
    Branch: 'Walnut Creek',
  },
  {
    Name: 'Barbara Collins',
    Email: 'bcollins@appleone.com',
    Branch: 'Walnut Creek',
  },
  {
    Name: 'Brittney Dean',
    Email: 'bdean@appleone.com',
    Branch: 'Nashville',
  },
  {
    Name: 'Brooke Farrell',
    Email: 'bfarrell@appleone.com',
    Branch: 'Puente Hills',
  },
  {
    Name: 'Briana Holland',
    Email: 'bholland@appleone.com',
    Branch: 'Fremont',
  },
  {
    Name: 'Bonnie Hulse',
    Email: 'bhulse@appleone.com',
    Branch: 'Mission Viejo Career Center',
  },
  {
    Name: 'Brad Keslick',
    Email: 'bkeslick@appleone.com',
    Branch: 'Canada • Hamilton',
  },
  {
    Name: 'Bob Morris',
    Email: 'bmorris@appleone.com',
    Branch: 'Seattle',
  },
  {
    Name: 'Brenda Ellison',
    Email: 'brendae@ain1.com',
    Branch: 'AllSTEM - Transportation Huddle Group',
  },
  {
    Name: 'Brittany Harris',
    Email: 'brittanyh@ain1.com',
    Branch: 'HRCG - 8823',
  },
  {
    Name: 'Brooke Lee',
    Email: 'brlee@appleone.com',
    Branch: 'Cerritos',
  },
  {
    Name: 'Brooke  Williams',
    Email: 'brookew@appleone.com',
    Branch: 'Charleston',
  },
  {
    Name: 'Bruce Davidson',
    Email: 'bruced@appleone.com',
    Branch: 'Fremont',
  },
  {
    Name: 'Bobbi Scott',
    Email: 'bscott@acheckglobal.com',
    Branch: 'Cerritos',
  },
  {
    Name: 'Bobbi Scott',
    Email: 'bscott@appleone.com',
    Branch: 'Cerritos',
  },
  {
    Name: 'Bob Thompson',
    Email: 'bthompson@appleone.com',
    Branch: 'Culver City',
  },
  {
    Name: 'Charlene Artis-Armstrong',
    Email: 'caarmstrong@appleone.com',
    Branch: 'Charlotte',
  },
  {
    Name: 'Corby Abondano',
    Email: 'cabondano@appleone.com',
    Branch: 'Culver City',
  },
  {
    Name: 'Caitlyn Beverland',
    Email: 'caitlynb@appleone.com',
    Branch: 'Tampa',
  },
  {
    Name: 'Connie Athans',
    Email: 'cathans@appleone.com',
    Branch: 'Mission Viejo Career Center',
  },
  {
    Name: 'Catherine Campbell',
    Email: 'catherinec@appleone.com',
    Branch: 'Canada • Vancouver',
  },
  {
    Name: 'Claudia Barron',
    Email: 'cbarron@appleone.com',
    Branch: 'Bakersfield',
  },
  {
    Name: 'Chere Bearden',
    Email: 'cbearden@appleone.com',
    Branch: 'Shreveport',
  },
  {
    Name: 'Cole Beebe',
    Email: 'cbeebe@appleone.com',
    Branch: 'Bloomington, MN',
  },
  {
    Name: 'Christina Borg',
    Email: 'cborg@appleone.com',
    Branch: 'Canada • Mississauga',
  },
  {
    Name: 'Christine Charles ',
    Email: 'ccharles@appleone.com',
    Branch: 'King of Prussia',
  },
  {
    Name: 'Carrie Clymer',
    Email: 'cclymer@appleone.com',
    Branch: 'Anaheim',
  },
  {
    Name: 'Christina Colon',
    Email: 'ccolon@appleone.com',
    Branch: 'Tampa',
  },
  {
    Name: 'Courtney Cromwell',
    Email: 'ccromwell@ain1.com',
    Branch: 'AllSTEM - Transportation Huddle Group',
  },
  {
    Name: 'Chelsea Eklund',
    Email: 'ceklund@appleone.com',
    Branch: 'Charlotte',
  },
  {
    Name: 'Tina Giampaolo',
    Email: 'cgiampaolo@appleone.com',
    Branch: 'Indianapolis',
  },
  {
    Name: 'Christopher Goss',
    Email: 'cgoss@appleone.com',
    Branch: 'Fresno',
  },
  {
    Name: 'Cherry Tran',
    Email: 'cherryt@appleone.com',
    Branch: 'Puente Hills',
  },
  {
    Name: 'Cheryl Jones',
    Email: 'cherylj@appleone.com',
    Branch: 'Glendale Full Time',
  },
  {
    Name: 'Charles Miller',
    Email: 'chmiller@appleone.com',
    Branch: 'Roseville',
  },
  {
    Name: 'Charles Miller',
    Email: 'chmiller@mail.all-in-1.com',
    Branch: 'Roseville',
  },
  {
    Name: 'Chrissy Johnson',
    Email: 'chrissyjohnson@appleone.com',
    Branch: 'Upland',
  },
  {
    Name: 'Christine Ward',
    Email: 'christinew@appleone.com',
    Branch: 'Corona',
  },
  {
    Name: 'Carol Jones',
    Email: 'cjones@acheckglobal.com',
    Branch: 'AppleOne Phoenix',
  },
  {
    Name: 'Carol Jones',
    Email: 'cjones@agile1.com',
    Branch: 'AppleOne Phoenix',
  },
  {
    Name: 'Carol Jones',
    Email: 'cjones@appleone.com',
    Branch: 'AppleOne Phoenix',
  },
  {
    Name: 'Carol Jones',
    Email: 'cjones@appleone.com',
    Branch: 'AppleOne Phoenix',
  },
  {
    Name: 'Chris Lastarza',
    Email: 'clastarza@allswell.com',
    Branch: "All's Well - Orlando",
  },
  {
    Name: 'Crystal Lowenberg',
    Email: 'clowenberg@appleone.com',
    Branch: 'Sandy',
  },
  {
    Name: 'Cristi Mallari',
    Email: 'cmallari@ain1.com',
    Branch: 'West Des Moines',
  },
  {
    Name: 'Crystal Johnson',
    Email: 'cmjohnson@appleone.com',
    Branch: 'Pleasanton',
  },
  {
    Name: 'Cathy Moran',
    Email: 'cmoran@appleone.com',
    Branch: 'Cypress Creek-Ft. Lauderdale',
  },
  {
    Name: 'Cory Nevin',
    Email: 'cnevin@appleone.com',
    Branch: 'Seattle',
  },
  {
    Name: 'Colleen Owens',
    Email: 'cowens@allswell.com',
    Branch: "All's Well - Tampa",
  },
  {
    Name: 'Colleen Owens',
    Email: 'cowens@appleone.com',
    Branch: "All's Well - Tampa",
  },
  {
    Name: 'Colton Rinzler',
    Email: 'crinzler@appleone.com',
    Branch: 'Overland Park',
  },
  {
    Name: 'Cynthia  Ruiz',
    Email: 'cruiz@ain1.com',
    Branch: 'North San Diego Career Center',
  },
  {
    Name: 'Carlos Sanchez',
    Email: 'csanchez@acheckglobal.com',
    Branch: 'Boulder',
  },
  {
    Name: 'Carlos Sanchez',
    Email: 'csanchez@act-1.com',
    Branch: 'Boulder',
  },
  {
    Name: 'Carlos Sanchez',
    Email: 'csanchez@appleone.com',
    Branch: 'Boulder',
  },
  {
    Name: 'Carlos Sanchez',
    Email: 'csanchez@appleone.com',
    Branch: 'Boulder',
  },
  {
    Name: 'Christina Thurman',
    Email: 'cthurman@appleone.com',
    Branch: 'Central Orange County Career Center',
  },
  {
    Name: 'David Allen',
    Email: 'dallen@appleone.com',
    Branch: 'Bakersfield',
  },
  {
    Name: 'Daniel Collins',
    Email: 'danielc@appleone.com',
    Branch: 'Newport Coast Career Center',
  },
  {
    Name: 'danielle Sheppard',
    Email: 'danielles@appleone.com',
    Branch: 'Canada • Bilingual One, Toronto',
  },
  {
    Name: 'Darnesha Parker',
    Email: 'darneshap@appleone.com',
    Branch: 'Richmond',
  },
  {
    Name: 'David Cruz',
    Email: 'davidc@appleone.com',
    Branch: 'Pittsburgh',
  },
  {
    Name: 'Drake Barnett',
    Email: 'dbarnett@allstemconnections.com',
    Branch: 'AllSTEM - IT 1',
  },
  {
    Name: 'Dave Borginis',
    Email: 'dborginis@appleone.com',
    Branch: 'Roseville',
  },
  {
    Name: 'Diana  Chick',
    Email: 'dchick@appleone.com',
    Branch: 'Roseville',
  },
  {
    Name: "De'Ahzha Williams",
    Email: 'deahzhaw@appleone.com',
    Branch: 'Chesapeake',
  },
  {
    Name: 'Derek Bowen',
    Email: 'debowen@appleone.com',
    Branch: 'Greenville',
  },
  {
    Name: 'Demetric Koonce',
    Email: 'dekoonce@appleone.com',
    Branch: 'Perimeter',
  },
  {
    Name: 'Destinee  Gutierrez',
    Email: 'destineeg@appleone.com',
    Branch: 'South Orlando',
  },
  {
    Name: 'Darrell Fuller',
    Email: 'dfuller@appleone.com',
    Branch: 'Shreveport',
  },
  {
    Name: 'Dejan Grahovac',
    Email: 'dgrahovac@bilingualone.ca',
    Branch: 'Canada • Bilingual One, Toronto',
  },
  {
    Name: 'Deja  Grissom',
    Email: 'dgrissom@appleone.com',
    Branch: 'Jacksonville',
  },
  {
    Name: 'Douglas Hahn',
    Email: 'dhahn@appleone.com',
    Branch: 'NYC Wall Street',
  },
  {
    Name: 'Deon Haynes',
    Email: 'dhaynes@appleone.com',
    Branch: 'Henderson',
  },
  {
    Name: 'Deon Haynes',
    Email: 'dhaynes@appleone.com',
    Branch: 'Henderson',
  },
  {
    Name: 'Desiree Lenning',
    Email: 'dlenning@appleone.com',
    Branch: 'AppleOne Peoria',
  },
  {
    Name: 'Denise Mille',
    Email: 'dmille@appleone.com',
    Branch: 'Sandy',
  },
  {
    Name: 'Deepthi Jadwani',
    Email: 'dmjadwani@allstemconnections.com',
    Branch: 'AllSTEM - IT 1',
  },
  {
    Name: 'Diane Samia',
    Email: 'dsamia@appleone.com',
    Branch: 'Petaluma',
  },
  {
    Name: 'David Thomas',
    Email: 'dthomas@ain1.com',
    Branch: 'Human Resources',
  },
  {
    Name: 'Darlene  Vergel De Dios',
    Email: 'dvdedios@appleone.com',
    Branch: 'Beverly Hills',
  },
  {
    Name: 'Derek Zipp',
    Email: 'dzipp@ain1.com',
    Branch: 'HRCG - 8823',
  },
  {
    Name: 'Ericka Nunez',
    Email: 'ebarreto@appleone.com',
    Branch: 'Cypress',
  },
  {
    Name: 'Ezely Bennett',
    Email: 'ebennett@appleone.com',
    Branch: 'Temecula',
  },
  {
    Name: 'Eraina Casey',
    Email: 'ecasey@allswell.com',
    Branch: "All's Well - Orlando",
  },
  {
    Name: 'Eunice Cortez',
    Email: 'ecortez@appleone.com',
    Branch: 'Seattle',
  },
  {
    Name: 'Elfis Hiraldo',
    Email: 'ehiraldo@appleone.com',
    Branch: 'Cypress Creek-Ft. Lauderdale',
  },
  {
    Name: 'Ebony Howard',
    Email: 'ehoward@appleone.com',
    Branch: 'Austin Northwest',
  },
  {
    Name: 'Enrique Leal',
    Email: 'eleal@appleone.com',
    Branch: 'Tucson',
  },
  {
    Name: 'Estelle Lopez',
    Email: 'elopez@appleone.com',
    Branch: 'Downey',
  },
  {
    Name: 'Eric Magnuson',
    Email: 'emagnuson@appleone.com',
    Branch: "All's Well - Philadelphia",
  },
  {
    Name: 'Emily Malcolm',
    Email: 'emalcolm@appleone.com',
    Branch: 'Bellevue',
  },
  {
    Name: 'Ed Maudlin',
    Email: 'emaudlin@appleone.com',
    Branch: 'Indianapolis',
  },
  {
    Name: 'Esmerelda Ortiz',
    Email: 'eortiz@allstemconnections.com',
    Branch: 'AllSTEM - Transportation Huddle Group',
  },
  {
    Name: 'Erin Williams',
    Email: 'erinw@allstemconnections.com',
    Branch: 'AllSTEM - IT 1',
  },
  {
    Name: 'fname lname',
    Email: 'erpEmail',
    Branch: 'officeName',
  },
  {
    Name: 'Esmeralda Cortes',
    Email: 'esmeraldac@appleone.com',
    Branch: 'Bloomington, MN',
  },
  {
    Name: 'Erin  Treuil ',
    Email: 'etreuil@appleone.com',
    Branch: 'Charleston',
  },
  {
    Name: 'Emily Walton',
    Email: 'ewalton@appleone.com',
    Branch: 'Orlando',
  },
  {
    Name: 'Erin Wood',
    Email: 'ewood@appleone.com',
    Branch: 'Sandy',
  },
  {
    Name: 'Erin Wood',
    Email: 'ewood@mail.all-in-1.com',
    Branch: 'Sandy',
  },
  {
    Name: 'Freya Trezona',
    Email: 'ftrezona@appleone.com',
    Branch: 'South Carolina Government',
  },
  {
    Name: 'Gabriella Alas',
    Email: 'galas@appleone.com',
    Branch: 'Westwood',
  },
  {
    Name: 'Gladys Beltran',
    Email: 'gbeltran@appleone.com',
    Branch: 'AppleOne Bunker Hill',
  },
  {
    Name: 'Ginny Campacci',
    Email: 'gcampacci@appleone.com',
    Branch: 'Philadelphia',
  },
  {
    Name: 'Gliza Valdez',
    Email: 'glizav@ain1.com',
    Branch: 'HRCG - 8823',
  },
  {
    Name: 'Guillaume Miszczak',
    Email: 'gmiszczak@bilingualone.ca',
    Branch: 'Canada • BilingualOne, West Toronto',
  },
  {
    Name: 'Genesis Rodriguez',
    Email: 'grgascot@appleone.com',
    Branch: 'AppleOne San Juan',
  },
  {
    Name: 'Gladys Romo',
    Email: 'gromo@appleone.com',
    Branch: 'Downtown Riverside',
  },
  {
    Name: 'Gina Rosa',
    Email: 'grosa@appleone.com',
    Branch: 'South Orlando',
  },
  {
    Name: 'Geri Ryan',
    Email: 'gryan@appleone.com',
    Branch: 'AllSource PPS - 8688',
  },
  {
    Name: 'Ging Van',
    Email: 'gvan@appleone.com',
    Branch: 'San Mateo',
  },
  {
    Name: 'Holly Bennet',
    Email: 'hbennet@appleone.com',
    Branch: 'Nashville',
  },
  {
    Name: 'Heather Bertuccelli',
    Email: 'hbertuccelli@appleone.com',
    Branch: 'South Charlotte',
  },
  {
    Name: 'Helen Gonzalez',
    Email: 'heleng@appleone.com',
    Branch: 'Charlotte',
  },
  {
    Name: 'Heather Floyd',
    Email: 'hfloyd@appleone.com',
    Branch: 'Newport Coast Career Center',
  },
  {
    Name: 'Heather Rosenbaum',
    Email: 'hrosenbaum@appleone.com',
    Branch: 'Reston',
  },
  {
    Name: 'Ishana Lennard',
    Email: 'ilennard@ain1.com',
    Branch: 'National Account Recruitment Center',
  },
  {
    Name: 'Irma  Miranda',
    Email: 'imiranda@appleone.com',
    Branch: 'Downey',
  },
  {
    Name: 'Jackie Smith',
    Email: 'jackies@appleone.com',
    Branch: 'Sherman Oaks ',
  },
  {
    Name: 'Jaylan Agosa',
    Email: 'jagosa@appleone.com',
    Branch: 'Seattle',
  },
  {
    Name: 'Jamie Walsh',
    Email: 'jamiew@ain1.com',
    Branch: 'National Account Recruitment Center',
  },
  {
    Name: 'Jill Apperson',
    Email: 'japperson@appleone.com',
    Branch: 'Raleigh',
  },
  {
    Name: 'Jason Amundson',
    Email: 'jason@a-w-f.com',
    Branch: 'HRCG - 8823',
  },
  {
    Name: 'James Boris',
    Email: 'jboris@appleone.com',
    Branch: 'Canada • Brampton',
  },
  {
    Name: 'Jidaylee Candelaria',
    Email: 'jcandelaria@appleone.com',
    Branch: 'AppleOne San Juan',
  },
  {
    Name: 'Josephine Chavez',
    Email: 'jchavez@appleone.com',
    Branch: 'Pleasanton',
  },
  {
    Name: 'Jan Coll',
    Email: 'jcoll@appleone.com',
    Branch: 'Westwood',
  },
  {
    Name: 'Joanna Czajkowska',
    Email: 'jczajkowska@appleone.com',
    Branch: 'Canada • Mississauga',
  },
  {
    Name: 'Jennifer Drumm',
    Email: 'jdrumm@appleone.com',
    Branch: 'Greenville',
  },
  {
    Name: 'Julie Dunston',
    Email: 'jdunston@appleone.com',
    Branch: 'Kent',
  },
  {
    Name: 'Jeanette Ramirez',
    Email: 'jeanetter@appleone.com',
    Branch: 'Ontario',
  },
  {
    Name: 'Jessica  Elkins ',
    Email: 'jelkins@appleone.com',
    Branch: 'South Carolina Government',
  },
  {
    Name: 'Jennifer Britton',
    Email: 'jenniferb@appleone.com',
    Branch: 'Canada • North York',
  },
  {
    Name: 'Jimmy Ervin',
    Email: 'jervin@appleone.com',
    Branch: 'West Des Moines',
  },
  {
    Name: 'Jessica Wright',
    Email: 'jessicaw@appleone.com',
    Branch: 'Pleasanton',
  },
  {
    Name: 'Jessica Price',
    Email: 'jessp@appleone.com',
    Branch: 'Reston',
  },
  {
    Name: 'Jennifer Stevens',
    Email: 'jestevens@appleone.com',
    Branch: 'Charlotte',
  },
  {
    Name: 'Julie Evans',
    Email: 'jevans@appleone.com',
    Branch: 'Pleasanton',
  },
  {
    Name: 'Julie Evans',
    Email: 'jevans@appleone.com',
    Branch: 'Pleasanton',
  },
  {
    Name: 'Junell ` Fendel',
    Email: 'jfendel@appleone.com',
    Branch: 'Kent',
  },
  {
    Name: 'Jason Getlin',
    Email: 'jgetlin@appleone.com',
    Branch: 'Chicago',
  },
  {
    Name: 'Jason Habib',
    Email: 'jhabib@appleone.com',
    Branch: 'NYC Wall Street',
  },
  {
    Name: 'Jonathan Hardin',
    Email: 'jhardin@appleone.com',
    Branch: 'Greensboro Career Center, NC',
  },
  {
    Name: 'Human  Resources',
    Email: 'jlhathaway@mail.all-in-1.com',
    Branch: 'Human Resources - Corporate',
  },
  {
    Name: 'Jeff Lusk',
    Email: 'jlusk@appleone.com',
    Branch: 'Canada • Brampton',
  },
  {
    Name: 'Jessica Luva',
    Email: 'jluva@appleone.com',
    Branch: 'San Bernardino',
  },
  {
    Name: 'Jose Mejorado',
    Email: 'jmejorado@appleone.com',
    Branch: 'Roseville',
  },
  {
    Name: 'Joni Clark',
    Email: 'joclark@appleone.com',
    Branch: 'Tampa',
  },
  {
    Name: 'Account Executive',
    Email: 'jomartin@appleone.com',
    Branch: 'Cypress',
  },
  {
    Name: 'Jodi Pava',
    Email: 'jpava@appleone.com',
    Branch: 'Reston',
  },
  {
    Name: 'Judy Pineda',
    Email: 'jpineda@appleone.com',
    Branch: 'Ontario',
  },
  {
    Name: 'Jake Smith',
    Email: 'jsmith@ain1.com',
    Branch: 'AllSTEM - IT 1',
  },
  {
    Name: 'Jake Smith',
    Email: 'jsmith@appleone.com',
    Branch: 'AllSTEM - IT 1',
  },
  {
    Name: 'Jake Smith',
    Email: 'jsmith@mail.all-in-1.com',
    Branch: 'AllSTEM - IT 1',
  },
  {
    Name: 'Julie Sobel',
    Email: 'jsobel@appleone.com',
    Branch: 'Pittsburgh',
  },
  {
    Name: 'Jamie Stone',
    Email: 'jstone@agile1.com',
    Branch: 'Beverly Hills',
  },
  {
    Name: 'Jamie Stone',
    Email: 'jstone@appleone.com',
    Branch: 'Beverly Hills',
  },
  {
    Name: 'Jamie Stone',
    Email: 'jstone@appleone.com',
    Branch: 'Beverly Hills',
  },
  {
    Name: 'Jude Washington',
    Email: 'judew@appleone.com',
    Branch: 'Ontario',
  },
  {
    Name: 'Justin Cervantes',
    Email: 'justinc@appleone.com',
    Branch: 'Bloomington, MN',
  },
  {
    Name: 'Jade Villa',
    Email: 'jvilla@appleone.com',
    Branch: 'Greeley',
  },
  {
    Name: 'Jade Villa',
    Email: 'jvilla@appleone.com',
    Branch: 'Greeley',
  },
  {
    Name: 'Joshua Zavala',
    Email: 'jzavala@appleone.com',
    Branch: 'AppleOne Peoria',
  },
  {
    Name: 'Karrie Brooks',
    Email: 'karrieb@appleone.com',
    Branch: 'Cypress',
  },
  {
    Name: 'Kimberly Arrington',
    Email: 'karrington@appleone.com',
    Branch: 'Dallas',
  },
  {
    Name: 'Kayla  Rea',
    Email: 'kaylar@appleone.com',
    Branch: 'South Carolina Government',
  },
  {
    Name: 'Kristina Barrett',
    Email: 'kbarrett@appleone.com',
    Branch: 'Las Vegas Southwest',
  },
  {
    Name: 'Krista Brough',
    Email: 'kbrough@appleone.com',
    Branch: 'Boulder',
  },
  {
    Name: 'Kristen Cde Baca',
    Email: 'kcdebaca@appleone.com',
    Branch: 'Lakewood',
  },
  {
    Name: 'Kellie Danaher',
    Email: 'kdanaher@appleone.com',
    Branch: 'Bellevue',
  },
  {
    Name: 'Karla Delima',
    Email: 'kdelima@appleone.com',
    Branch: 'Alpharetta',
  },
  {
    Name: 'Keri Eagle',
    Email: 'keagle@appleone.com',
    Branch: 'Walnut Creek',
  },
  {
    Name: 'Kelly Gonzalez',
    Email: 'kellyg@agile1.com',
    Branch: 'Downey',
  },
  {
    Name: 'Kelly Gonzalez',
    Email: 'kellyg@appleone.com',
    Branch: 'Downey',
  },
  {
    Name: 'Kerry  Stevens',
    Email: 'kerrys@appleone.com',
    Branch: 'Canada • Burlington',
  },
  {
    Name: 'kevin nguyen',
    Email: 'kevinn@appleone.com',
    Branch: 'Upland',
  },
  {
    Name: 'Kristin Fogarty',
    Email: 'kfogarty@appleone.com',
    Branch: 'Houston Galleria',
  },
  {
    Name: 'Karen Ford',
    Email: 'kford@ain1.com',
    Branch: 'Kirkland - Engineering & Technical',
  },
  {
    Name: 'Kim Gaan',
    Email: 'kgaan@appleone.com',
    Branch: 'Santa Clara',
  },
  {
    Name: 'Kayla Gomes',
    Email: 'kgomes@appleone.com',
    Branch: 'Canada • North York',
  },
  {
    Name: 'Kaiya  Iacobucci',
    Email: 'kiacobucci@appleone.com',
    Branch: 'Newport News',
  },
  {
    Name: 'Kim Hochstetler',
    Email: 'kimh@allswell.com',
    Branch: "All's Well - Orlando",
  },
  {
    Name: 'Krystal Key',
    Email: 'kkey@appleone.com',
    Branch: 'Tempe',
  },
  {
    Name: 'Karina Melgarejo',
    Email: 'kmelgarejo@appleone.com',
    Branch: 'Bakersfield',
  },
  {
    Name: 'keerthy nair',
    Email: 'knair@appleone.com',
    Branch: 'Fremont',
  },
  {
    Name: 'Kim Pannell',
    Email: 'kpannell@appleone.com',
    Branch: 'Indianapolis',
  },
  {
    Name: 'Kirsten Reynolds',
    Email: 'kreynolds@appleone.com',
    Branch: 'Canada • North York',
  },
  {
    Name: 'Kristen Green',
    Email: 'kristeng@appleone.com',
    Branch: 'Orlando',
  },
  {
    Name: 'Kenny Rosemeyer',
    Email: 'krosemeyer@ain1.com',
    Branch: 'AllSTEM - Transportation Huddle Group',
  },
  {
    Name: 'Krystina Collins',
    Email: 'krystinac@appleone.com',
    Branch: 'Mission Viejo Career Center',
  },
  {
    Name: 'Kandace Stocke',
    Email: 'kstocke@appleone.com',
    Branch: 'Glendale Full Time',
  },
  {
    Name: 'Kathy Timmer',
    Email: 'ktimmer@mail.all-in-1.com',
    Branch: 'Regional Office - 9676 Michael Logal',
  },
  {
    Name: 'Kristina Rogozyan',
    Email: 'kvrogozyan@appleone.com',
    Branch: 'Anaheim',
  },
  {
    Name: 'Kyle Winters',
    Email: 'kwinters@appleone.com',
    Branch: 'Raleigh',
  },
  {
    Name: 'Kyle Dixon',
    Email: 'kydixon@appleone.com',
    Branch: 'Canada • Hamilton',
  },
  {
    Name: 'Kate Zauner',
    Email: 'kzauner@appleone.com',
    Branch: 'Reston',
  },
  {
    Name: 'Laura Bowick',
    Email: 'laurab@appleone.com',
    Branch: 'Canada • Mississauga',
  },
  {
    Name: 'Lauren Kellis',
    Email: 'laurenk@appleone.com',
    Branch: 'South Orlando',
  },
  {
    Name: 'Lupe Barrera',
    Email: 'lbarrera@appleone.com',
    Branch: 'Newport Coast Career Center',
  },
  {
    Name: 'Lisa Beck',
    Email: 'lbeck@appleone.com',
    Branch: 'Reno',
  },
  {
    Name: 'Leslie Belich',
    Email: 'lbelich@appleone.com',
    Branch: "All's Well - Columbia",
  },
  {
    Name: 'Lanette Brown',
    Email: 'lbrown@ain1.com',
    Branch: 'A-Check America - Ontario',
  },
  {
    Name: 'Lisa Cavanagh',
    Email: 'lcavanagh@appleone.com',
    Branch: 'West Palm Beach',
  },
  {
    Name: 'Laura Chastain',
    Email: 'lchastain@appleone.com',
    Branch: 'Corona',
  },
  {
    Name: 'luis chong',
    Email: 'lchong@appleone.com',
    Branch: 'Pasadena',
  },
  {
    Name: 'Lacie Cowan',
    Email: 'lcowan@appleone.com',
    Branch: 'Overland Park',
  },
  {
    Name: 'Leslie Buderus',
    Email: 'leslieb@ain1.com',
    Branch: 'AllSTEM - Scientific 1',
  },
  {
    Name: 'Leslie Cotton-Wainscott',
    Email: 'lesliec@appleone.com',
    Branch: 'Portland',
  },
  {
    Name: 'Lesley Heavey',
    Email: 'lheavey@appleone.com',
    Branch: 'Chicago',
  },
  {
    Name: 'Lisa Taylor',
    Email: 'lisat@appleone.com',
    Branch: 'Philadelphia',
  },
  {
    Name: 'Lizette Figueroa',
    Email: 'lizettef@appleone.com',
    Branch: 'San Francisco',
  },
  {
    Name: 'LaToya Jones',
    Email: 'ljones@appleone.com',
    Branch: 'Central San Diego Career Center',
  },
  {
    Name: 'LaToya Jones',
    Email: 'ljones@appleone.com',
    Branch: 'Central San Diego Career Center',
  },
  {
    Name: 'LaToya Jones',
    Email: 'ljones@appleone.com',
    Branch: 'Central San Diego Career Center',
  },
  {
    Name: 'Liz Kimoni',
    Email: 'lkimoni@appleone.com',
    Branch: 'Bloomington, MN',
  },
  {
    Name: 'Lauren Klotz',
    Email: 'lklotz@bilingualone.ca',
    Branch: 'Canada • Bilingual One, North York',
  },
  {
    Name: 'lora  kwak',
    Email: 'lkwak@ain1.com',
    Branch: 'AllSTEM - Transportation Huddle Group',
  },
  {
    Name: 'Leigh Mabie',
    Email: 'lmabie@appleone.com',
    Branch: 'South Carolina Government',
  },
  {
    Name: 'Lourdes Marrero',
    Email: 'lmarrero@appleone.com',
    Branch: 'AppleOne Hatillo',
  },
  {
    Name: 'Litoya Mikel',
    Email: 'lmikel@ain1.com',
    Branch: 'National Account Recruitment Center',
  },
  {
    Name: 'Lydia Moussa',
    Email: 'lmoussa@appleone.com',
    Branch: 'Edison',
  },
  {
    Name: 'Lindsey Prestwood',
    Email: 'lprestwood@appleone.com',
    Branch: 'Las Colinas',
  },
  {
    Name: 'Ludhmila Ravi',
    Email: 'lravi@appleone.com',
    Branch: 'Canada • Richmond Hill',
  },
  {
    Name: 'Lindsey Roth',
    Email: 'lroth@appleone.com',
    Branch: 'Greeley',
  },
  {
    Name: 'Lynn Schreck',
    Email: 'lschreck@appleone.com',
    Branch: 'Las Colinas',
  },
  {
    Name: 'Lindsey Sumner',
    Email: 'lsumner@appleone.com',
    Branch: 'Las Colinas',
  },
  {
    Name: 'Lynette Walker',
    Email: 'lwalker@agile1.com',
    Branch: 'Pleasanton',
  },
  {
    Name: 'Lynette Walker',
    Email: 'lwalker@appleone.com',
    Branch: 'Pleasanton',
  },
  {
    Name: 'Lindsey Walters',
    Email: 'lwalters@appleone.com',
    Branch: 'Bakersfield',
  },
  {
    Name: 'Linda Zaragoza',
    Email: 'lzaragoza@appleone.com',
    Branch: 'San Bernardino',
  },
  {
    Name: 'Mayra Ramirez',
    Email: 'maramirez@appleone.com',
    Branch: 'Long Beach',
  },
  {
    Name: 'Marycruz Figueroa',
    Email: 'marycruzf@appleone.com',
    Branch: 'Columbia, SC',
  },
  {
    Name: 'Mattison Walker',
    Email: 'mattisonw@appleone.com',
    Branch: 'Westwood',
  },
  {
    Name: 'Mauro  Tamayo',
    Email: 'maurot@appleone.com',
    Branch: 'Canada • Brampton',
  },
  {
    Name: 'Michelle Corado',
    Email: 'mcorado@appleone.com',
    Branch: 'Temecula',
  },
  {
    Name: 'Michele Cuppan',
    Email: 'mcuppan@appleone.com',
    Branch: 'Sandy',
  },
  {
    Name: 'Marion Dailey',
    Email: 'mdailey@appleone.com',
    Branch: 'Central San Diego Career Center',
  },
  {
    Name: 'Meg Dehaven',
    Email: 'mdehaven@appleone.com',
    Branch: 'Boulder',
  },
  {
    Name: 'Melissa Drimer',
    Email: 'mdrimer@appleone.com',
    Branch: 'Philadelphia',
  },
  {
    Name: 'Damon Smith',
    Email: 'mdsmith@appleone.com',
    Branch: 'Downtown Riverside',
  },
  {
    Name: 'Marcy Duff',
    Email: 'mduff@allstemconnections.com',
    Branch: 'AllSTEM - Scientific 1',
  },
  {
    Name: 'Melisa Johnson',
    Email: 'melisaj@appleone.com',
    Branch: 'Portland',
  },
  {
    Name: 'Mikayla  Esslinger ',
    Email: 'messlinger@appleone.com',
    Branch: 'Indianapolis',
  },
  {
    Name: 'Megan Stewart',
    Email: 'mestewart@appleone.com',
    Branch: 'Orlando',
  },
  {
    Name: 'Account Executive',
    Email: 'mewen@appleone.com',
    Branch: 'Albany, NY',
  },
  {
    Name: 'Michaela Faulkner',
    Email: 'mfaulkner@allsourcepps.com',
    Branch: 'AllSource PPS - 8688',
  },
  {
    Name: 'Miosotis Figueroa',
    Email: 'mfigueroa@appleone.com',
    Branch: 'AppleOne Hatillo',
  },
  {
    Name: 'Miosotis Figueroa',
    Email: 'mfigueroa@appleone.com',
    Branch: 'AppleOne Hatillo',
  },
  {
    Name: 'Michelle Fitch',
    Email: 'mfitch@allswell.net',
    Branch: "All's Well - Bakersfield",
  },
  {
    Name: 'Maria Galila',
    Email: 'mgalila@appleone.com',
    Branch: 'Las Colinas',
  },
  {
    Name: 'Madeline Heath',
    Email: 'mheath@appleone.com',
    Branch: 'Kent',
  },
  {
    Name: 'Michele Henderson',
    Email: 'mhenderson@appleone.com',
    Branch: 'Pleasanton',
  },
  {
    Name: 'Marissa Hendrickson',
    Email: 'mhendrickson@appleone.com',
    Branch: 'Columbia, SC',
  },
  {
    Name: 'MONIQUE Herrera',
    Email: 'mherrera@allswell.com',
    Branch: "All's Well - Huntington Beach",
  },
  {
    Name: 'Manda Hess',
    Email: 'mhess@appleone.com',
    Branch: 'Tempe',
  },
  {
    Name: 'Madison Hinson',
    Email: 'mhinson@appleone.com',
    Branch: 'Pittsburgh',
  },
  {
    Name: 'Maria Huicochea',
    Email: 'mhuicochea@appleone.com',
    Branch: 'Newport Coast Career Center',
  },
  {
    Name: 'Michael Ryan',
    Email: 'michaelr@appleone.com',
    Branch: 'Newport News',
  },
  {
    Name: 'Michelle Martinez',
    Email: 'michellema@appleone.com',
    Branch: 'Cerritos',
  },
  {
    Name: 'Megan Kamayatsu',
    Email: 'mkamayatsu@appleone.com',
    Branch: 'Downey',
  },
  {
    Name: 'Michelle Kent',
    Email: 'mkent@appleone.com',
    Branch: 'Santa Clara',
  },
  {
    Name: 'Megan Maguire',
    Email: 'mmaguire@appleone.com',
    Branch: 'Tampa',
  },
  {
    Name: 'Maryann Mclinden',
    Email: 'mmclinden@appleone.com',
    Branch: 'Santa Clara',
  },
  {
    Name: 'Mack  McThomas',
    Email: 'mmcthomas@allstemconnections.com',
    Branch: 'AllSTEM - IT 1',
  },
  {
    Name: 'Mark Michel',
    Email: 'mmichel@appleone.com',
    Branch: 'Canada • BilingualOne, West Toronto',
  },
  {
    Name: 'Mark Michel',
    Email: 'mmichel@bilingualone.ca',
    Branch: 'Canada • BilingualOne, West Toronto',
  },
  {
    Name: 'Mayra Murcia',
    Email: 'mmurcia@appleone.com',
    Branch: 'Cerritos',
  },
  {
    Name: 'Morgan Morris',
    Email: 'morganm@appleone.com',
    Branch: 'Charlotte',
  },
  {
    Name: 'Matt Savage',
    Email: 'msavage@appleone.com',
    Branch: 'Shreveport',
  },
  {
    Name: 'Marlene Velez',
    Email: 'mvelez@appleone.com',
    Branch: 'AppleOne Hatillo',
  },
  {
    Name: 'Nancy Ahlrichs',
    Email: 'nahlrichs@appleone.com',
    Branch: 'Overland Park',
  },
  {
    Name: 'Norma Camargo',
    Email: 'ncamargo@ain1.com',
    Branch: 'Human Resources - Corporate',
  },
  {
    Name: 'nicholas contes',
    Email: 'ncontes@appleone.com',
    Branch: 'Pasadena',
  },
  {
    Name: 'Natalie Dyke ',
    Email: 'ndyke@ain1.com',
    Branch: 'Bakersfield',
  },
  {
    Name: 'Neal Farling',
    Email: 'nfarling@appleone.com',
    Branch: 'Tampa',
  },
  {
    Name: 'Norma Herrera',
    Email: 'nherrera@appleone.com',
    Branch: 'Cerritos',
  },
  {
    Name: 'Nisha Mailwaganam',
    Email: 'nisham@appleone.com',
    Branch: 'Canada • Richmond Hill',
  },
  {
    Name: 'natalie rivero',
    Email: 'nrivero@appleone.com',
    Branch: 'Culver City',
  },
  {
    Name: 'Niko Ruperto',
    Email: 'nruperto@appleone.com',
    Branch: 'Valencia',
  },
  {
    Name: 'Narcissa Savacsaian',
    Email: 'nsavacsaian@appleone.com',
    Branch: 'Seattle',
  },
  {
    Name: 'Nic Schemm',
    Email: 'nschemm@mail.all-in-1.com',
    Branch: 'Santa Clara',
  },
  {
    Name: 'Nicole Veternik',
    Email: 'nveternik@appleone.com',
    Branch: 'Cordova',
  },
  {
    Name: 'Olivia Hardy',
    Email: 'ohardy@appleone.com',
    Branch: 'Columbia, SC',
  },
  {
    Name: 'Paige Johnson',
    Email: 'paigej@appleone.com',
    Branch: 'Canada • Mississauga',
  },
  {
    Name: 'Peter Carvalho',
    Email: 'pcarvalho@ain1.com',
    Branch: 'AllSTEM - IT 1',
  },
  {
    Name: 'Pippa Christian',
    Email: 'pchristian@appleone.com',
    Branch: 'Canada • Barrie',
  },
  {
    Name: 'Paul Evangelista',
    Email: 'pevangelista@appleone.com',
    Branch: 'Santa Clara',
  },
  {
    Name: 'Paul Gasser',
    Email: 'pgasser@appleone.com',
    Branch: 'Seattle',
  },
  {
    Name: 'quinnie  collins',
    Email: 'qcollins@appleone.com',
    Branch: 'Princeton',
  },
  {
    Name: 'Qunisha Fowler',
    Email: 'qfowler@ain1.com',
    Branch: 'AllSTEM - Transportation Huddle Group',
  },
  {
    Name: 'Rebecca Becerra',
    Email: 'rbarrios@appleone.com',
    Branch: 'Upland',
  },
  {
    Name: 'Rick Binder',
    Email: 'rbinder@appleone.com',
    Branch: 'Central San Diego Career Center',
  },
  {
    Name: 'Raman  Brar',
    Email: 'rbrar@appleone.com',
    Branch: 'Canada • Mississauga',
  },
  {
    Name: 'Raquel Cuevas',
    Email: 'rcuevas@appleone.com',
    Branch: 'Walnut Creek',
  },
  {
    Name: 'Raquel Escoto',
    Email: 'rescoto@appleone.com',
    Branch: 'Woodland Hills',
  },
  {
    Name: 'Rosie  Flauta',
    Email: 'rflauta@appleone.com',
    Branch: 'Pleasanton',
  },
  {
    Name: 'Rosa Granados',
    Email: 'rgranados@appleone.com',
    Branch: 'Miami',
  },
  {
    Name: 'Government Services',
    Email: 'rhagmann@ain1.com',
    Branch: 'Government Services - AppleOne',
  },
  {
    Name: 'Roberta Hall',
    Email: 'rhall@appleone.com',
    Branch: 'Alpharetta',
  },
  {
    Name: 'Robert Hodgdon',
    Email: 'rhodgdon@appleone.com',
    Branch: 'Pittsburgh',
  },
  {
    Name: 'Rhonda Johnson',
    Email: 'rjohnson@appleone.com',
    Branch: 'Buffalo',
  },
  {
    Name: 'Rashein Lindsey',
    Email: 'rlindsey@appleone.com',
    Branch: 'Seattle',
  },
  {
    Name: 'ryan Morris',
    Email: 'rmorris@allsourcepps.com',
    Branch: 'AllSource PPS - 8688',
  },
  {
    Name: 'Roxann Murphy',
    Email: 'rmurphy@ain1.com',
    Branch: 'AllSource PPS - 8688',
  },
  {
    Name: 'Riketta Norfleet',
    Email: 'rnorfleet@appleone.com',
    Branch: 'Newport News',
  },
  {
    Name: 'Roscoe Thomas',
    Email: 'roscoet@appleone.com',
    Branch: 'Austin Northwest',
  },
  {
    Name: 'Rhea Sharbono',
    Email: 'rsharbono@appleone.com',
    Branch: 'Bloomington, MN',
  },
  {
    Name: 'Robert Wennagel',
    Email: 'rwennagel@act-1.com',
    Branch: 'Bellevue',
  },
  {
    Name: 'Sandra Franchi',
    Email: 'safranchi@bilingualone.ca',
    Branch: 'Canada • Bilingual One, North York',
  },
  {
    Name: 'Sander  Alberto',
    Email: 'salberto@appleone.com',
    Branch: 'Las Vegas II - West Sahara ',
  },
  {
    Name: 'Sarah Evans',
    Email: 'sarahe@appleone.com',
    Branch: 'South Carolina Government',
  },
  {
    Name: 'Sarah Lundquist',
    Email: 'sarahl@appleone.com',
    Branch: 'San Mateo',
  },
  {
    Name: 'Sara  Rangel',
    Email: 'sarangel@appleone.com',
    Branch: 'Santa Barbara',
  },
  {
    Name: 'Sasha  Sarmiento',
    Email: 'sashas@appleone.com',
    Branch: 'Orlando',
  },
  {
    Name: 'Savannah Brown',
    Email: 'savannahb@appleone.com',
    Branch: 'Downtown Riverside',
  },
  {
    Name: 'Shaunna Bejgrowicz',
    Email: 'sbejgrowicz@appleone.com',
    Branch: 'Las Vegas II - West Sahara ',
  },
  {
    Name: 'Sabrina Doran',
    Email: 'sdoran@appleone.com',
    Branch: 'Fort Worth',
  },
  {
    Name: "Sean O'Keefe",
    Email: 'seano@appleone.com',
    Branch: 'Bellevue',
  },
  {
    Name: 'Sean Thomas',
    Email: 'seant@appleone.com',
    Branch: 'Portland',
  },
  {
    Name: 'Serena  Lopez ',
    Email: 'serenal@appleone.com',
    Branch: 'Shreveport',
  },
  {
    Name: 'Sharokeyna Esho ',
    Email: 'sesho@appleone.com',
    Branch: 'Canada • Etobicoke',
  },
  {
    Name: 'Savannah Faulkner',
    Email: 'sfaulkner@appleone.com',
    Branch: 'South Charlotte',
  },
  {
    Name: 'Sheena Freeman',
    Email: 'sfreeman@appleone.com',
    Branch: 'Upland',
  },
  {
    Name: 'Simone Ganesh',
    Email: 'sganesh@appleone.com',
    Branch: 'Paramus',
  },
  {
    Name: 'Sarina  Gonzan',
    Email: 'sgonzan@appleone.com',
    Branch: 'Oxnard',
  },
  {
    Name: 'Shannon Jantz',
    Email: 'sjantz@appleone.com',
    Branch: 'Greeley',
  },
  {
    Name: 'Spencer Kimbro',
    Email: 'skimbro@appleone.com',
    Branch: 'Greensboro Career Center, NC',
  },
  {
    Name: 'Sam Krygier',
    Email: 'skrygier@appleone.com',
    Branch: 'Portland',
  },
  {
    Name: 'Saundra Johnson',
    Email: 'sljohnson@appleone.com',
    Branch: 'Newport News',
  },
  {
    Name: 'Saundra Johnson',
    Email: 'sljohnson@appleone.com',
    Branch: 'Newport News',
  },
  {
    Name: 'Sierra  Mazzucca',
    Email: 'smazzucca@appleone.com',
    Branch: 'Culver City',
  },
  {
    Name: 'Sheena McCarthy',
    Email: 'smccarthy@allsourcepps.com',
    Branch: 'AllSource PPS - 8688',
  },
  {
    Name: 'Samantha McHugh',
    Email: 'smchugh@ain1.com',
    Branch: 'National Fulfillment Center',
  },
  {
    Name: 'Shirley Mclean',
    Email: 'smclean@mail.all-in-1.com',
    Branch: 'Canada • Richmond Hill',
  },
  {
    Name: 'Sebastien Moreau',
    Email: 'smoreau@bilingualone.ca',
    Branch: 'Canada • BilingualOne, West Toronto',
  },
  {
    Name: 'Sarah  Nanthavong',
    Email: 'snanthavong@appleone.com',
    Branch: 'Cypress',
  },
  {
    Name: 'Solemar Vazquez',
    Email: 'solemarv@appleone.com',
    Branch: 'AppleOne San Juan',
  },
  {
    Name: "Sarah O'Neil",
    Email: 'soneil@appleone.com',
    Branch: 'Newport News',
  },
  {
    Name: 'Samantha Orodpour',
    Email: 'sorodpour@appleone.com',
    Branch: 'San Bernardino',
  },
  {
    Name: 'Sabrina Qadri',
    Email: 'sqadri@appleone.com',
    Branch: 'Canada • North York',
  },
  {
    Name: 'Samantha Reighard',
    Email: 'sreighard@appleone.com',
    Branch: 'Kent',
  },
  {
    Name: 'Scarlett Sobolak',
    Email: 'ssobolak@appleone.com',
    Branch: 'Shreveport',
  },
  {
    Name: 'Stefen Spector',
    Email: 'sspector@appleone.com',
    Branch: 'Tucson',
  },
  {
    Name: 'Staicy Stephen',
    Email: 'sstephen@actadv.com',
    Branch: 'Canada • Accounting Advantage - Mississauga',
  },
  {
    Name: 'shaniqua swinger',
    Email: 'sswinger@appleone.com',
    Branch: 'Chesapeake',
  },
  {
    Name: 'stephanie jones',
    Email: 'stephaniej@appleone.com',
    Branch: 'Southeast and Caribbean Recruiting Team (SCRT)',
  },
  {
    Name: 'Stephanie Richards',
    Email: 'stephanier@bilingualone.ca',
    Branch: 'Canada • BilingualOne, West Toronto',
  },
  {
    Name: 'Sarah Thorkildsen',
    Email: 'sthorkildsen@appleone.com',
    Branch: 'Canada • Hamilton',
  },
  {
    Name: 'silvana toma',
    Email: 'stoma@appleone.com',
    Branch: 'Canada • Burlington',
  },
  {
    Name: 'Shani Tracey',
    Email: 'stracey@appleone.com',
    Branch: 'AppleOne Technical Staffing Orlando',
  },
  {
    Name: 'Sucelly Cerna',
    Email: 'sucellyc@allswell.com',
    Branch: "All's Well - National Fulfillment Center",
  },
  {
    Name: 'Samantha Watts',
    Email: 'swatts@appleone.com',
    Branch: 'Canada • Richmond Hill',
  },
  {
    Name: 'Sandra Lopez',
    Email: 'sylopez@appleone.com',
    Branch: 'Pasadena',
  },
  {
    Name: 'Samantha Zepeda',
    Email: 'szepeda@appleone.com',
    Branch: 'West Des Moines',
  },
  {
    Name: 'Tara Davis',
    Email: 'tarad@appleone.com',
    Branch: 'Columbia, SC',
  },
  {
    Name: 'Tina Baltes',
    Email: 'tbaltes@appleone.com',
    Branch: 'Raleigh',
  },
  {
    Name: 'Tia Banks',
    Email: 'tbanks@appleone.com',
    Branch: 'Richmond',
  },
  {
    Name: 'Tia Banks',
    Email: 'tbanks@appleone.com',
    Branch: 'Richmond',
  },
  {
    Name: 'Taylor Brinkley',
    Email: 'tbrinkley@appleone.com',
    Branch: 'Greensboro Career Center, NC',
  },
  {
    Name: 'Thomas Brite',
    Email: 'tbrite@appleone.com',
    Branch: 'Austin Northwest',
  },
  {
    Name: 'Tara Gay',
    Email: 'tgay@appleone.com',
    Branch: 'Charleston',
  },
  {
    Name: 'Theresa Harris',
    Email: 'tharris2@appleone.com',
    Branch: 'San Jose',
  },
  {
    Name: 'Tara Heringer',
    Email: 'theringer@appleone.com',
    Branch: 'Greenwood Village',
  },
  {
    Name: 'Tanweer Hussain',
    Email: 'thussain@mail.all-in-1.com',
    Branch: 'Corporate MIS',
  },
  {
    Name: 'Tia Akeme',
    Email: 'tiaakeme@allswell.com',
    Branch: "All's Well - Philadelphia",
  },
  {
    Name: 'Tommy Li',
    Email: 'tli@appleone.com',
    Branch: 'Newport Coast Career Center',
  },
  {
    Name: 'Travis McGill',
    Email: 'tmcgill@appleone.com',
    Branch: 'Edison',
  },
  {
    Name: 'Teri Nunn',
    Email: 'tnunn@appleone.com',
    Branch: 'AppleOne Accounting and Finance Temecula',
  },
  {
    Name: 'Toni Salgado',
    Email: 'tsalgado@appleone.com',
    Branch: 'Cerritos',
  },
  {
    Name: 'Tammy Schmidt',
    Email: 'tschmidt@appleone.com',
    Branch: 'Pittsburgh',
  },
  {
    Name: 'Ulduz Nuru',
    Email: 'unuru@appleone.com',
    Branch: 'Chicago',
  },
  {
    Name: 'Veronica Addington',
    Email: 'vaddington@appleone.com',
    Branch: 'South Orlando',
  },
  {
    Name: 'Vanessa Ruiz',
    Email: 'varuiz@appleone.com',
    Branch: 'Long Beach',
  },
  {
    Name: 'Victoria Garcia',
    Email: 'vgarcia@appleone.com',
    Branch: 'AppleOne Phoenix',
  },
  {
    Name: 'Vicki Gorman',
    Email: 'vgorman@appleone.com',
    Branch: 'Newport Coast Career Center',
  },
  {
    Name: 'Veronika Kryuchkova',
    Email: 'vkryuchkova@appleone.com',
    Branch: 'Canada • Burlington',
  },
  {
    Name: 'Maria Vivian Padua',
    Email: 'vpadua@appleone.com',
    Branch: 'Seattle',
  },
  {
    Name: 'Veronica Pratt',
    Email: 'vpratt@appleone.com',
    Branch: 'Downtown Riverside',
  },
  {
    Name: 'Veronica Quintero',
    Email: 'vquintero@appleone.com',
    Branch: 'Fresno',
  },
  {
    Name: 'Vicki Scarlett',
    Email: 'vscarlett@appleone.com',
    Branch: 'Walnut Creek',
  },
  {
    Name: 'Valerie  Velasquez',
    Email: 'vvelasquez@allswell.com',
    Branch: "All's Well - Huntington Beach",
  },
  {
    Name: 'Victoria Velazquez',
    Email: 'vvelazquez@appleone.com',
    Branch: 'Downey',
  },
  {
    Name: 'Wendy Diaz',
    Email: 'wdiaz@ain1.com',
    Branch: 'Downtown L.A.',
  },
  {
    Name: 'Wendy Diaz',
    Email: 'wdiaz@appleone.com',
    Branch: 'Downtown L.A.',
  },
  {
    Name: 'wendy mednick',
    Email: 'wmednick@appleone.com',
    Branch: 'Buffalo',
  },
  {
    Name: 'Winston Mize',
    Email: 'wmize@appleone.com',
    Branch: 'Cordova',
  },
  {
    Name: 'Wanda Russo',
    Email: 'wrusso@appleone.com',
    Branch: 'Glendale Full Time',
  },
  {
    Name: 'Yazmin Orozco',
    Email: 'yorozco@appleone.com',
    Branch: 'Downtown Riverside',
  },
  {
    Name: 'Zafram Alvarez',
    Email: 'zalvarez@appleone.com',
    Branch: 'Miami',
  },
  {
    Name: 'Zulynet Burgos',
    Email: 'zburgos@appleone.com',
    Branch: 'AppleOne San Juan',
  },
  {
    Name: 'Zicri Valenzuela',
    Email: 'zvalenzuela@appleone.com',
    Branch: 'Newport Coast Career Center',
  },
];


const url = 'https://a.deephire.com/v1/companies/invites'

const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9ESkVORGMxUVVGRU5FSXhNMEpDTVVJMU1EUkVRVEJGUkVRMU9UWkdOVUV4TVRWRlFrSkRRUSJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLmRlZXBoaXJlLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZmM5MDAyNjViZGRkMjAwNmUyZjM3ZDEiLCJhdWQiOlsiaHR0cDovL2EuZGVlcGhpcmUuY29tIiwiaHR0cHM6Ly9kZWVwaGlyZTIuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYxOTYwNzAxNywiZXhwIjoxNjE5NjkzNDE3LCJhenAiOiJqaHpHRlpIVHY4ZWhwR3NrVkt4WnJfalhPQXZLZzdEVSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6W119.tDP_QxGRAOTYlPo4fh3mbxJpaTLIaa5jZASmzx7O0UVqILiDmQNfFJMKsI9qCEnOEUkrjQlk4MAxRWw8T61n4wEO4HZ_GD9j7pe8iI1uQnJFoPJbm3SP_f5zwE32A3LSufG6kyGFETYhbaf9hykvrAcaGA_SvBIVXihXLeLrs1p9aBFeT3RbiZkcODCXJNlX6Le9-Nb_XKHUqUH0UhzXs7Rycl2jzmacbM1dXvr5NQ6wq62HNg3_X7JLhLfOAqLHEQN06uP7wbyNmzv_4prviWeEcKluQPS1kCIHVvjEYGKlTDt1tteHMv4oqG7IIwR-vucYn2PdjWBJj_mShKu9cw'



bodys.forEach((body => {
invite = {
    invitedEmail: body.Email,
    team: body.Branch,
    role: 'user'
}
    resp = fetch(url, { method: "POST", body: JSON.stringify(invite), headers: {'authorization': token, 'Content-Type': 'application/json'} } )
    console.log(resp)
}))