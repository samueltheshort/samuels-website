import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { SimpleLayout } from '@/components/SimpleLayout';
import { Card } from '@/components/Card';

// Export the imageData array
export const imageData = [
  {
    id: 1,
    name: 'A shell is being loaded into an 8-inch howitzer.',
    description: 'A shell is being loaded into an 8-inch gun of Battery C, 578th Field Artillery Battalion near Bleialf, Germany.',
    image: '578th-field-artillery-battalion-01.jpg',
    category: 'Artillery',
    source: 'Author collection',
    date: '9 February 1945',
  },
  {
    id: 2,
    name: 'The 614th Tank Destroyer Battalion',
    description: 'A three-inch M5 gun with the crew of the 614th Tank Destroyer Battalion.',
    image: '614th-tank-destroyer-battalion-01.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 3,
    name: 'The 614th Tank Destroyer Battalion',
    description: 'An officer and two enlisted men of the 614th Tank Destroyer Battalion.',
    image: '614th-tank-destroyer-battalion-02.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 4,
    name: 'A soldier of the 614th Tank Destroyer Battalion',
    description: 'A soldier of the 614th Tank Destroyer Battalion poses with a round for the M3 anti-tank gun.',
    image: '614th-tank-destroyer-battalion-03.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 5,
    name: 'Charlie Rattler of the 614th Tank Destroyer Battalion',
    description: 'Charlie Rattler, Third Platoon, Company C, the 614th Tank Destroyer Battalion sits on the ground with a bazooka.',
    image: '614th-tank-destroyer-battalion-04.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 6,
    name: 'Charlie Rattler of the 614th Tank Destroyer Battalion is smoking a cigarette',
    description: 'Charlie Rattler, Third Platoon, Company C, the 614th Tank Destroyer Battalion is smoking a cigarette. This photograph was published in a 1945.',
    image: '614th-tank-destroyer-battalion-05.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 7,
    name: 'Charlie Rattler of the 614th Tank Destroyer Battalion in a foxhole with another soldier',
    description: 'Charlie Rattler, of Third Platoon, C Company, the 614th Tank Destroyer Battalion together with another soldier in a foxhole.',
    image: '614th-tank-destroyer-battalion-06.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 8,
    name: 'A camouflaged three inch gun of the 614th Tank Destoyer Battalion',
    description: 'A three inch M5 gun covered by camouflage netting.',
    image: '614th-tank-destroyer-battalion-07.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 9,
    name: 'A three inch gun of the 614th Tank Destroyer Battalion during a firing exercise',
    description: 'Members of the gun crew of a tank destroyer unit load their piece during practice firing, somewhere in England, before leaving for the real thing on the continent. Left to Right: Pfc. Aurbery Morris (Hobbsville, NC), Pfc. J. C. Heatem (Detroit, MI), Pfc. Robert B. Russell (Ashville, NC), 1st Lt. U.V. Watkins (Huntsville, TX), Pfc. Cebe Young (Ashville, NC), Pfc. James H. Mason (Williamston, NC). 614th Tank Destroyer Battalion, Burley, England.',
    image: '614th-tank-destroyer-battalion-08.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },
  {
    id: 10,
    name: 'An officer and an enlisted man in front of a halftrack',
    description: 'An officer and an enlisted man of the 614th Tank Destroyer Battalion stand in front of a halftrack.',
    image: '614th-tank-destroyer-battalion-09.jpg',
    category: 'Tank Destroyers',
    source: 'United States Army Heritage and Education Center.',
    date: '1945',
  },  
  {
    id: 11,
    name: 'Several soldiers of the 777th Field Artillery Battalion in a dugout',
    description: 'Soldiers of a Field Artillery Battalion near Ubach, Germany, sit in dugout near their gun waiting for firing orders.',
    image: '777th-field-artillery-battalion-01.jpg',
    category: 'Artillery',
    source: 'National Archives and Records Administration (NAID: 178140868).',
    date: '7 January 1945',
  },
  {
    id: 12,
    name: 'Soldiers of the 24th Infantry Regiment man a 37mm gun',
    description: 'Soldiers of the 24th Infantry Regiment in New Georgia man a 37mm gun used for beach against the enemy.',
    image: '24th-infantry-regiment-01.jpg',
    category: 'Infantry',
    source: 'National Archives and Records Administration: SC 329679.',
    date: '15 October 1943',
  },
  {
    id: 13,
    name: 'Members of the 758th Light Tank Battalion fire their 75mm howitzer',
    description: 'Members of the 758th Tank Battalion fire their 75mm howitzer in support of infantry movements on the Fifth Army front.',
    image: '758th-tank-battalion-01.jpg',
    category: 'Tanks',
    source: 'National Archives and Records Administration: SC 329839.',
    date: '4 April 1945',
  },
  {
    id: 14,
    name: 'Soldiers of the 999th Field Artillery Battalion are about to fire another shell at a target.',
    description: 'Another present from "Harlem to Hitler" is presented on behalf of the men of an artillery outfit which is firing at the barges in which the Germans are trying to escape across the River Seine. Montes-Gassicourt, France, August 20, 1944. The men are of the 999th Field Artillery Battalion, Battery A.',
    image: '999th-field-artillery-battalion-01.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Edication Center',
    date: '4 April 1945',
  },
  {
    id: 15,
    name: 'John T. Fields, an armorer with the 332nd Fighter Group',
    description: 'Private First Class John T. Fields, an armorer with the 332nd Fighter Group, checks the ammunition of a P-51 Mustang.',
    image: '332nd-fighter-group-01.jpg',
    category: 'Air Force',
    source: 'National Archives and Records Administration (NAID: 204909486)',
    date: '28 August 1944',
  },
  {
    id: 16,
    name: 'Opening of the 6888th Central Postal Directory Battalion bar in France',
    description: "In Rouen, France, Second Lieutenant Freda le Beau (New Orleans, LA), post exchange officer, serves the first Coca Cola to Major Charity Adams (Columbia, South Carolina), at the grand opening of the WAC battalion's new snack bar.",
    image: '6888th-central-postal-directory-battalion-01.jpg',
    category: 'WAC',
    source: 'National Archives and Records Administration (NAID: 175539159).',
    date: '1945',
  },
  {
    id: 17,
    name: 'Major Charity Adams inspects the troops under her command',
    description: 'Somewhere in England, Maj. Charity E. Adams, Columbia, S.C., and Capt. Abbie N. Campbell, Tuskegee Institute, Tuskegee, Ala, during an inspection.',
    image: '6888th-central-postal-directory-battalion-02.jpg',
    category: 'WAC',
    source: 'National Archives and Records Administration: (NAID: 531249)',
    date: 'February 1945',
  },
  {
    id: 18,
    name: 'The arrival of the 6888th Central Postal Directory Battalion in Scotland',
    description: 'As a Scottish piper instructs Pfc. Edith Gaskill, Arlington, Va., in the art of playing bagpipes, Pvt. Marie McKinney, Washington, D.C., examines his kilt. The Wacs are members of the first Black all-Wac postal unit to arrive in the European theater of operations. The unit will handle the Army Postal Directory Service for the entire theater. U.S. Army port, Greenock, Scotland.',
    image: '6888th-central-postal-directory-battalion-03.jpg',
    category: 'WAC',
    source: 'National Archives and Records Administration (NAID: 175539147)',
    date: 'February 1945',
  },
  {
    id: 19,
    name: 'Photograph of the Charity Adams and her company at Fort Des Moines, Iowa',
    description: "WAAC Capt. Charity Adams of Columbia, S.C., who was commissioned from the first officer candidate class, and the first of her group to receive a commission, drills her company on the drill ground at the first Waac Training Center, Fort Des Moines, Iowa. Note: At that time the WAC (Women's Army Corps) was known as the WAAC (Women's Army Auxiliary Corps).",
    image: '6888th-central-postal-directory-battalion-04.jpg',
    category: 'WAC',
    source: 'National Archives and Records Administration (NAID: 531334)',
    date: 'May 1943',
  },
  {
    id: 20,
    name: 'Photograph of a Black American wedding in Rouen, France',
    description: "Chaplain William T. Green reads the benediction services at the marriage ceremonies of Private First Class Florence A. Collins, a WAC of the 6888th Postal Directory Battalion, to Corporal William A. Johnson of the 1696th Labor Supervision Company. This is the 5th African American marriage to be performed in the European Theatre of Operation. A similar image appeared in The Michigan Chronicle, 6 October 1945. Note, a newspaper article gives the name William H. Johnson of the 169th Labor Supervision Company and mentions it's the first Black American marriage.",
    image: '6888th-central-postal-directory-battalion-05.jpg',
    category: 'WAC',
    source: 'Ike Skelton Combined Arms Research Library (SC 210939)',
    date: '6 October 1945',
  },
  {
    id: 21,
    name: 'A howitzer of the 593rd Field Artillery Battalion',
    description: '1st section gun crew, Battery A, 593rd Field Artillery Battalion, 93rd Infantry Division, loads a 105mm howitzer and prepares to fire (Bougainville).',
    image: '593rd-field-artillery-battalion-01.jpg',
    category: 'Artillery',
    source: 'National Archives and Records Administration: SC 364570',
    date: '16 April 1944',
  },
  {
    id: 22,
    name: 'A M4 Sherman tank of the 761st Tank Battalion',
    description: 'A M4 Sherman tank of the 761st Tank Battalion. The men in this photograph would die less than 24 hours after this image was taken.',
    image: '761st-tank-battalion-01.jpg',
    category: 'Tanks',
    source: 'National Archives and Records Administration: SC 196105-S',
    date: '5 November 1944',
  },
  {
    id: 23,
    name: 'A M4 Sherman tank of the 761st Tank Battalion is crossing a Bailey Bridge in France',
    description: 'A M4 Sherman tank of the 761st Tank Battalion is crossing a Bailey Bridge in France on their way to the frontline.',
    image: '761st-tank-battalion-02.jpg',
    category: 'Tanks',
    source: 'National Archives and Records Administration (NAID: 175739015)',
    date: '9 November 1944',
  },
  {
    id: 24,
    name: 'A light tank with Black American trainees',
    description: 'Pfc. Dewey McClain, Jacksonville, Fla., Pvt. Hulet MacHenry, Salina, Kan., and Pfc. Lester Baker, Alexandria, La. Armored School Det., Replacement and Training Command. (Naples area, Italy)',
    image: '758th-tank-battalion-02.jpg',
    category: 'Tanks',
    source: 'National Archives and Records Administration: SC 364368',
    date: '1 March 1945',
  },
  {
    id: 25,
    name: 'Benjamin O. Davis',
    description: 'Benjamin O. Davis, the commander of the 332nd Fighter Group.',
    image: 'benjamin-o-davis-01.jpg',
    category: 'Air Force',
    source: 'National Archives and Records Administration (NAID: 204992697)',
    date: 'June 1944',
  },
  {
    id: 26,
    name: 'Battery B, 49th Coast Artillery, section 2, fires at Japanese positions on Bougainville',
    description: 'This 155mm rifle, operated by Black troops, is firing at Jap positions on Bougainville. The soldier at left prepares to sponge the breech.',
    image: '49th-coast-artillery-regiment-01.jpg',
    category: 'Artillery',
    source: 'Courtesy of the United States Army Heritage and Education Center',
    date: '16 April 1944',
  },
  {
    id: 27,
    name: 'First Sergeant James Sims shows Private John Stephens his .45 pistol',
    description: 'rst Sergeant James Sims of Los Angeles, who saw World War I, as a member of the 801st Pioneers, is shown here on his way to another war as top cutter of a Battery of C.A.A., which sailed on a transport from a Port of Embarkation in U.S. Sergeant Sims is telling Private John O. Stephens of Los Angeles how to handle a 45 in close quarters. Sims said Stephens is the brightest boy in his battery. August 1942. Battery A, 76th C.A.A. S.S. Mormacsea at Fort Mason, California.',
    image: '76th-coast-artillery-regiment-01.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '9 August 1942',
  },
  {
    id: 28,
    name: 'Soldiers of the 76th Coast Artillery Regiment show their bayonets',
    description: '"That pig sticker is so sharp it will slit a hair," says Pvt Wm Crook of Ripley, Tenn. He proves it too, with a hirsute speciment from the cranium of Pvt Theo Bean of Birmingham, Ala. The four soldiers are members of Hq. Co. of a C.A.A. unit. They sailed on the transport for overseas duty in the Pacific. They are not talking about slicing vegetables with these bayonets; they are eager to see Tokyo. Aboard a tranport from a Port of Embarkation in US. August 1942. Hq. Co. 76th C.A.A. SS Mormacsea at Fort Mason, Calif.',
    image: '76th-coast-artillery-regiment-02.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '9 August 1942',
  },
  {
    id: 29,
    name: 'Soldiers of the 76th Coast Artillery Regiment are looking at their bayonets',
    description: 'Another photograph of the same soldiers, where they are displaying their bayonets.',
    image: '76th-coast-artillery-regiment-03.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '9 August 1942',
  },
  {
    id: 30,
    name: 'Soldiers of the 76th Coast Artillery Regiment asleep',
    description: 'Half an hour after the Black soldiers of a regimental headquarters battery of the C.A.A. marched aboard the transport, many of them were bedded down in their close quarters and snoring. The line next the camera, from bunk up, consists of: Pvt. Harrison Wyatt, Atlanta, Ga.; Technician Clarence L. Williams, Columbus, Ga.; Pvt. Bennie Simmons, Goulds, Fla.; Pvt. Patrick Williams, Wells Ferry, Ala.; Sgt. Clommie Watkins, Jackson, Tenn.; Sgt. Abi Stephens, Montgomery, Ala. Next row: Pvt. Willie Brown, Fort Meyers, Fla.; Pvt. William K. Watkins, Linden, Ala.; Pvt. Flenard Van, Pursglove, W.Va, Corp. John G. Thomas, Chicago, Ill. 76th C.A.A. SS Mormacsea at Fort Mason, Calif. Sunday night.',
    image: '76th-coast-artillery-regiment-04.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '9 August 1942',
  },
  {
    id: 31,
    name: 'Soldiers of the 76th Coast Artillery on board of the SS Mormacsea',
    description: '"Down the hatch" Black soldiers of a C.A.A. unit, few of whom ever were aboard a ship before, get acquinted with a new world aboard the transport as the line pauses on deck at the door of a hatch which leads below to the bunk tiers. A Port of Embarkation in U.S. 76th C.A.A. SS Mormacsea at Fort Mason, Calif.',
    image: '76th-coast-artillery-regiment-05.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '9 August 1942',
  },
  {
    id: 32,
    name: 'Soldiers of the 76th Coast Artillery are playing blackjack',
    description: 'Members of A C.A.A. regimental band, atop their bunk section in the hold of a transport, are playing a little blackjack before turning in. Aboard a transport from a Port of Embarkation in U.S. 76th C.A.A. SS Mormacsea at Fort Mason, Calif.',
    image: '76th-coast-artillery-regiment-06.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '9 August 1942',
  },
  {
    id: 33,
    name: 'Soldiers of the 76th or 77th Coast Artillery during a training exercise',
    description: 'C. D. nurse and defending medical troops pick up dead and wounded from the battle field, Ft. Moultrie, Charleston, S. C.',
    image: '76th-coast-artillery-regiment-07.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '22 October 1941',
  },
  {
    id: 34,
    name: 'Soldiers of the 76th or 77th Coast Artillery during a training exercise',
    description: 'Defending troops of Ft. Moultrie on the charge. C. D. Air raid exercises at Charleston, S. C.',
    image: '76th-coast-artillery-regiment-08.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '22 October 1941',
  },
  {
    id: 35,
    name: 'Soldiers of the 76th or 77th Coast Artillery during a training exercise',
    description: 'Soldiers at a charge after the parachutist have landed. C.D. Air raid exercises. Ft. Moultrie, Charleston, S. C.',
    image: '76th-coast-artillery-regiment-09.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '22 October 1941',
  },
  {
    id: 36,
    name: 'Soldiers of the 76th or 77th Coast Artillery Regiment during a training exercise',
    description: 'Defending troops capture the enemy during C. D. air raids, Ft. Moultrie, Charleston, S. C.',
    image: '76th-coast-artillery-regiment-10.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '22 October 1941',
  },
  {
    id: 37,
    name: 'Soldiers of the 76th Coast Artillery Regiment stand next to a large searchlight',
    description: 'Pvt. Robert Byrd, Henry Johnson, John Hamlin, Battery E, 76th CAC (AA) at searchlight during C. D. air raids exercises. Fort Moultrie, Charleston, S. C.',
    image: '76th-coast-artillery-regiment-11.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '22 October 1941',
  },
  {
    id: 38,
    name: 'Soldiers of Battery E the 76th Coast Artillery are lighting up the field during exercises',
    description: 'Searchlights lighting up first aid exercises on the field at Charleston, S. C., during the C. D. Air raid exercises.',
    image: '76th-coast-artillery-regiment-12.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: '22 October 1941',
  },
  {
    id: 39,
    name: 'A 3-inch anti-aircraft gun of the 76th Coast Artillery Regiment',
    description: 'A 3-inch anti-aircraft gun manned by soldiers of the 76th Coast Artillery Regimenton the firing range at Myrtle Beach, South Carolina. This photograph was taken by Harry R Price, the regimental commander.',
    image: '76th-coast-artillery-regiment-13.jpg',
    category: 'Artillery',
    source: 'United States Army Heritage and Education Center',
    date: 'Undated',
  },
  {
    id: 40,
    name: 'Major General Edward M. Almond, Commanding General of the 92nd Infantry Division, inspects his troops.',
    description: 'Maj. Gen. Edward M. Almond, Commanding General of the 92nd Infantry Division in Italy, inspects his troops during a decoration ceremony.',
    image: '92nd-infantry-division-01.jpg',
    category: 'Infantry',
    source: 'National Archives and Records Administration (NAID: 535547)',
    date: 'March 1945',
  },
  {
    id: 41,
    name: 'General George S. Patton converses with General Omar Bradly during their tour of the liberated Ohrdruf camp. On the left side, behind the MP, is a Black American soldier.',
    description: `Ohrdruf camp was liberated on 4 April 1945 by the 4th Armored Division and the 89th Infantry Division. It would be the first camp to be liberated by the U.S. Army. On 12 April 1945, Generals Dwight D. Eisenhower, George S. Patton and Omar visited the camp. Eisenhower later said about his visit: “I made the visit deliberately, in order to be in a position to give first-hand evidence of these things if ever, in the future, there develops a tendency to charge these allegations merely to 'propaganda'." He later requested that journalists and members of Congress visited the camp so that they too would be a witness to the horrors of what happened at these places. Among those witnesses were also Black American soldiers.`,
    image: 'ohrdruf-concentration-camp-01.jpg',
    category: '',
    source: 'United States Holocaust Memorial Museum: 87662',
    date: '12 April 1945',
  },
  {
    id: 42,
    name: 'A 40-mm Bofors gun of the 452nd Anti Aircraft-Artillery Battalion',
    description: 'A 40-mm Bofors gun of Battery A, 452nd Anti-Aircraft Artillery Battalion.',
    image: '452nd-anti-aircraft-artillery-battalion-01.jpg',
    category: 'Artillery',
    source: 'National Archives and Records Administration (NAID: 531222)',
    date: '9 November 1944',
  },
  {
    id: 43,
    name: 'Technical sergeant Alfred Masters, the first Black American sworn into the United States Marine Corps.',
    description: 'Alfred Masters was sworn in on 1 June 1942 at 00:01 hours and is the first Black American to serve in the United States Marine Corps.',
    image: 'alfred-masters-01.jpg',
    category: 'Marines',
    source: 'Courtesy of Isabell Arch Masters Family',
    date: '1944',
  },
  {
    id: 44,
    name: 'Howard Perry, the first Black American to arrive at Camp Lejeune, NC.',
    description: 'Howard P. Perry, the first recruit to report for marine training at Montford Point, Camp Lejeune, NC, is often erroneously credited with being the first Black American enlisted marine. However, Perry enlisted on July 23, 1942. The first Black American sworn in as a marine was Alfred Masters.',
    image: 'howard-perry-01.jpg',
    category: 'Marines',
    source: 'National Archives and Records Administration (NAID: 535870)',
    date: '1942',
  },
  {
    id: 50,
    name: 'Soldiers of the 218th Quartermaster Battalion are fueling jerricans.',
    description: 'Soldiers of the 218th Quartermaster Battalion are fueling jerrycans. These cans were used to fuel the advance of the Ninth Army during Operation Flashpoint. (Wegberg, Germany)',
    image: '218th-quartermaster-battalion-01.jpg',
    category: 'Quartermaster',
    source: 'United States Army Heritage and Education Center.',
    date: '23 March 1945',
  },
  {
    id: 51,
    name: 'An armed halftrack of the 827th Engineers Aviation Battalion.',
    description: 'Derived from original caption: Although the main job for the members of the 827th Engineers, is to construct an airport they still have to keep in trim for fighting. L to R: Private James Bryand, Sergeant Will L. Scott, Private First Class Dan Smith, and Corporal Woodrow George. This image also appeared in the Jackson Advocate of 4 September 1943, which alludes to an invasion of Germany. However, in September 1943, the Normandy landings were far in the future.',
    image: '827th-engineers-aviation-battalion-01.jpg',
    category: 'Engineers',
    source: 'Ike Skelton Combined Arms Research Library: SC 174587.',
    date: '1943',
  },
  {
    id: 100, 
    name: 'A retreat ceremony somewhere in the South Pacific Area.', 
    description: '"Old Glory" is lowered in a retreat ceremony somewhere in the South Pacific Area by Corporal John O. Crittonden, a member of Company A, 903rd Air Base Security Battalion.', 
    image: '903rd-airbase-security-battalion-01.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: SC 184656', 
    date: '29 June 1943'
  },
  {
    id: 101, 
    name: 'A message is speeded on its way by these men from a Headquarter Detachment of the 903rd Air Base Security Battalion.', 
    description: 'A message is speeded on its way by these men from a Headquarter Detachment of the 903rd Air Base Security Battalion somewhere in the South Pacific Area. L-R: T/5 Carl D. Hale, Sgt. William L. Shepard and T/4 R.C. Collins.', 
    image: '903rd-airbase-security-battalion-02.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: SC 164669', 
    date: 'undated'
  },
  {
    id: 102, 
    name: "It's chow time for the 903rd 903rd Air Base Security Battalion.", 
    description: "It's chow time at the 903rd Air Base Security Battalion in the South Pacific Area.", 
    image: '903rd-airbase-security-battalion-03.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: SC 184655', 
    date: '29 June 1943'
  },
  {
    id: 103, 
    name: 'Private Glenn Moore, Warren, Ohio, is vaccinated by by T/5 Henry Edwards, member of a Medical Detachment.', 
    description: 'A "shot" is given to Private Glenn Moore, Warren, Ohio, by T/5 Henry Edwards, member of a Medical Detachment serving in the South Pacific Area. Waiting are Private Willie J. L. Dawson, Greenville, S.C., and Private Curtis Daniel Knox, Palmetto, Ga', 
    image: '903rd-airbase-security-battalion-04.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: SC 184642', 
    date: '29 June 1943'
  },
  {
    id: 104, 
    name: 'Getting ready to turn in.', 
    description: 'Getting ready to turn in. 1st Lt. Harry L. Curtis, Morgantown, N.C., gives a few pointers to Cpl. Alfred Summerville, Washington, D.C., on a sea-going barracks, as they prepare for an overseas journey. 350th Engineer Regiment aboard the S.S. Poelau Laut, Pier 41-S, San Francisco Port of Embarkation.', 
    image: '350th-engineer-regiment-01.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: SC 171514', 
    date: '27 January, 1943.'
  },
  {
    id: 105, 
    name: 'Private Isaac Bartell, left, is instructed by S/Sgt. Thomas Blackstone.', 
    description: 'Private Isaac Bartell, left, Detroit, Mich., gets last-minute instructions from S/Sgt. Thomas A. Blackstone, Leonardtown, Md., as they prepare to go overseas. Both are with the 350th Engineer Regiment, aboard the S.S. Poelau Laut, Pier 41-S, San Francisco Port of Embarkation.', 
    image: '350th-engineer-regiment-02.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: SC 171515', 
    date: '27 January, 1943.'
  },
  {
    id: 106, 
    name: 'Private Robert A. Williams of Clarksdale.', 
    description: 'Private Robert A. Williams of Clarksdale, Miss., as he contemplates sleeping in a hammock aboard the transport on which his unit embarked for overseas. Company D, 462nd Port Battalion, embarked at San Francisco Port of Embarkation.', 
    image: '462nd-port-battalion-01.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: SC 171509', 
    date: '12 January 1943'
  },
  {
    id: 107, 
    name: 'Members of a Medical Detachment, 352nd Engineer Regiment, prepare for their overseas journey.', 
    description: 'Members of a Medical Detachment stowing their duffels and testing their hammocks on the deck of the transport on which they embarked for overseas. Detachment of the 352nd Engineer Regiment, embarked at San Francisco Port of Embarkation.', 
    image: '352nd-engineer-regiment-01.jpg', 
    category: '', 
    source: 'National Archives and Records Administration: SC 171512', 
    date: '12 January 1943'
  },
  {
    id: 108, 
    name: 'The remaining tanks of the Byrne Task Force are serviced by their crews.', 
    description: 'Before moving on to the next objective, the remaining tanks of the Byrne Task Force are serviced by their crews. Company B, 784th Tank Battalion, at Sevelen, Germany.', 
    image: '784th-tank-battalion-01.jpg', 
    category: 'Tanks', 
    source: 'National Archives and Records Administration: SC 336785', 
    date: '5 March 1945'
  },
  {
    id: 109, 
    name: 'Lieutenant Colonel Nolan Troxell teaches infantry warfare to a group of Black infantry volunteers.', 
    description: 'Lt. Col. Nolan Troxell, 1609 Olive St., Little Rock, Arkansas, veteran combat officer explains the tactics of infantry warfare to a group of Black soldiers, all volunteers from service units.', 
    image: 'infantry-volunteers-01.jpg', 
    category: 'Infantry', 
    source: 'National Archives and Records Administration: SC 337400', 
    date: '28 February 1945'
  },
  {
    id: 110, 
    name: 'Private George E. Stevens during infantry training.', 
    description: 'At the 47th Reinforcement Depot, Private George E. Stevens, Abbottsburg, North Carolina, undergoes some serious infantry training. 47th Reinforcement Depot. Noyon, France.', 
    image: 'infantry-volunteers-02.jpg', 
    category: 'Infantry', 
    source: 'National Archives and Records Administration: SC 337399', 
    date: '28 February 1945'
  }, 
  {
    id: 111, 
    name: 'Pvt. Felix Lawson and Pvt. Sammie Jenkins dig a foxhole.', 
    description: 'Pvt. Felix Lawson, 534 West St., [illegible], Md., and Pvt. Sammie Jenkins, 1200 17th St. Tuscaloosa, Ala., demonstrate the proper method of digging a foxhole.',   
    image: 'infantry-volunteers-03.jpg', 
    category: 'Infantry', 
    source: 'National Archives and Records Administration: SC 337398', 
    date: '28 February 1945'
  }, 
  {
    id: 112, 
    name: 'Soldiers of the 92nd Infantry Division are drying themselves in a ruined house.', 
    description: 'Pvt. Edward Imes, 1224 Rear Div. Ave., East St. Louis, IL.; T/5 William White, 246 South Johnson Ave., Pontiac, MI.; Pfc. James B. Glasby, 220 South Leffingwell Ave., St. Louis, MO.; and Pvt. Henry C. McKinney, 651 Reed St., Atlanta, GA. Viareggio Area, Italy.',   
    image: '92nd-infantry-division-02.jpg', 
    category: 'Infantry', 
    source: 'National Archives and Records Administration: SC 364370', 
    date: '14 December, 1944'
  }, 
  {
    id: 400, 
    name: 'The 22nd Special Naval Construction Battalion celebrates peace.', 
    description: "Members of the 22nd Special Naval Construction Battalion cheering news of Japan's acceptance of peace terms. Note sign: War is over! Good-Bye Pacific. Hello USA. This photograph is taken at Naval Amphibious Base, Manus, Admiralty Islands,",   
    image: '22nd-special-naval-contruction-battalion-01.jpg', 
    category: 'Navy', 
    source: 'Naval History and Heritage Command: 80-G-338470', 
    date: '15 August 1945'
  }, 
  {
    id: 401, 
    name: "Steward's Mate Second Class James Lee Frazer reads the Bible", 
    description: "Steward's Mate Second Class James Lee Frazer takes time to read a few chapters from his Bible, part of his daily devotional routine while serving on board an aircraft carrier. It's the night before his ship launched strikes on the Manila Bay area in support of the Lingayen Operation.",   
    image: 'james-frazer-01.jpg', 
    category: 'Navy', 
    source: 'Naval History and Heritage Command: 80-G-305241', 
    date: '9 January 1945'
  }, 
  {
    id: 402, 
    name: 'Mess attendants of the USS Copahee (ACV-12) man a 20mm machine gun', 
    description: 'Mess Attendants manning a 20mm machine gun, in a gun tub beside the flight deck. The carrier, USS Copahee (ACV-12), was then en route from Alameda, California, to the southwest Pacific.',   
    image: 'mess-attendants-20mm-01.jpg', 
    category: 'Navy', 
    source: 'Naval History and Heritage Command: 80-G-71586', 
    date: '9 September 1942'
  }, 
  {
    id: 403, 
    name: 'Wardroom of the USS Cero (SS-225)', 
    description: "Officers eating in the submarine's Wardroom, served by their Stewards, during Cero's shakedown period, circa July-August 1943, at the Groton, Connecticut, Submarine Base. Photographed by Charles Fenno Jacobs. Officers present are (from left to right): Lieutenant Commander David H. McClintock; Commander David C. White, Commanding Officer; Lieutenant Charles D. Nace.",   
    image: 'uss-cero-01.jpg', 
    category: 'Navy', 
    source: 'Naval History and Heritage Command: 80-G-K-15541', 
    date: 'July or August 1943'
  }, 
  {
    id: 404, 
    name: "Steward's Mates are playing cards", 
    description: 'Black American stewards are passing the time with a card game in their berthing space on board an aircraft carrier, the evening before their ship launched strikes on Manila.',   
    image: 'stewards-mates-01.jpg', 
    category: 'Navy', 
    source: 'Naval History and Heritage Command: 80-G-305242', 
    date: 'November 1944.'
  }, 
  {
    id: 405, 
    name: "Miles King carries a loaded 20mm machine gun magazine", 
    description: "Steward's Mate Second Class Miles Davis King carries a loaded magazine for a 20mm machine gun, as the escort carrier, USS Tulagi (CVE-72), steams through the Mediterranean Sea en route to the Invasion of Southern France.",   
    image: 'miles-king-01.jpg', 
    category: 'Navy', 
    source: 'Naval History and Heritage Command: 80-G-417623', 
    date: 'A few days prior to 15 August 1944.'
  }, 
  {
    id: 408,
    name: "It's chow time at an Air Base Security Battalion. in the South Pacific Area.",
    description: '903rd Air Base Security Battalion.',
    image: '903rd-air-base-security-battalion-04.jpg',
    category: '',
    source: 'National Archives and Records Administration: SC 184655',
    date: '29 June 1943'
  },
  {
    id: 412,
    name: 'Pvt. Robert A. Williams of Clarksdale, Miss., as he contemplates sleeping in a hammock aboard the transport on which his unit embarked for overseas.',
    description: 'Company D, 462nd Port Battalion, embarked at San Francisco Port of Embarkation.',
    image: 'SC_171509.jpg',
    category: '',
    source: 'National Archives and Records Administration: SC 171509',
    date: '12 January 1943'
  },
  {
    id: 418,
    name: 'GI chorus entertains U.S. troops at large HQ in Belgium on Christmas Eve.',
    description: 'The chorus under the supervision of Chaplain William A. Smith, of Sioux Falls, S.Dak., and lead by Cpl. John Wesley Mann, New York City, sang Black American spirituals and Christmas carols for over an hour. 390th Engineer Regiment Chorus, Namur, Belgium.',
    image: '390th-engineer-regiment-01.jpg',
    category: 'Engineer',
    source: 'National Archives and Records Administration: SC 364371',
    date: '24 December 1944'
  },
  {
    id: 419,
    name: 'Three bakers at a depot, somewhere in England, test a fresh pan of loaves as they come out of the oven.',
    description: 'Left to right: Pfc. James Brown, 419 Sullivan St., Greensville, Ky., T/Sgt., James McClattie, Route #1, Box 28, Evans, Ga., and Tec 5 Ben J. Carpenter, Boyston, Ga. General Depot G-50, Taunton, England.',
    image: 'baking-bread-01.jpg',
    category: '',
    source: 'National Archives and Records Administration: SC 364372',
    date: '19 November 1944'
  },
  {
    id: 421,
    name: 'Part of audience enjoying all-soldier entertainment near VII headquarters in Germany, sponsored by Quartermaster troops.',
    description: '999th Quartermaster Salvage Company, VII Corps.',
    image: '999th-quartermaster-salvage-company-01.jpg',
    category: 'Quartermaster',
    source: 'National Archives and Records Administration: SC 364374',
    date: '7 December 1944'
  },
  {
    id: 422,
    name: 'Four of the more than 200 service troops in France who volunteered for combat service, many of them accepting reductions in grade from Sgt. and Cpl. to qualify for the new assignment.',
    description: 'In the doorway of the train taking them to an infantry training center are: Pvt. John Hightower, Hartford, Conn.; Pfc. James Brock, Philadelphia, Pa.; Pfc. Herbert E. West, Philadelphia, Pa.; and Pvt. Lenzy Walker, San Antonio, Texas.',
    image: 'infantry-volunteers-04.jpg',
    category: 'Infantry',
    source: 'National Archives and Records Administration: SC 364375',
    date: '25 February 1945'
  },
  {
    id: 423,
    name: 'The post chapel has large crowd of Black troops in afternoon of Bishop Gregg sermon.',
    description: '',
    image: 'black-chapel-01.jpg',
    category: '',
    source: 'National Archives and Records Administration: SC 364367',
    date: '22 December 1943'
  },
  {
    id: 424,
    name: 'Personnel of the Postal Unit of a depot in England sort packages and mail.',
    description: 'Left to right: Pfc. Wilbur L. Grimillion, 4202 S. Michigan Ave., Chicago, Ill., 1st Lt. Ernest J. Harris, 1118 Embury Ave., Neptune, N.J., and Cpl. William J. Cooper, 1349 Christian St., Philadelphia, Pa. 511th Army Postal Unit, General Depot G-50, Taunton, England.',
    image: 'postal-unit-01.jpg',
    category: '',
    source: 'National Archives and Records Administration: SC 364373',
    date: '19 November 1944'
  },
  {
    id: 425,
    name: 'S/Sgt. Jacobs E. White, RT 4 Sumter, S.C., pulls his rank on his twin brother, Cpl. Benjamin S. White, by getting him to police up the area at Camp Atlanta near Chalons, France.',
    description: 'Both men are with 3118th 3118th Engineer Fire Fighting Platoon awaiting redeployment to the States.',
    image: '3118th-engineer-fire-fighting-platoon-01.jpg',
    category: 'Engineer',
    source: 'National Archives and Records Administration: SC 364379',
    date: '26 July 1945'
  },
  {
    id: 426,
    name: 'Cpl. David Shanks, gunner; and Sgt. Harold Edwards, on elevation of #3 90mm AA gun position of Btry. D, 742nd AA Battalion.',
    description: 'Espiritu Santo, New Hebrides.',
    image: '742nd-anti-aircraft-artillery-battalion-01.jpg',
    category: 'Artillery',
    source: 'National Archives and Records Administration: SC 364568',
    date: '17 April 1944'
  },
  {
    id: 427,
    name: 'Before attack: armored infantry dug-in in a field prior to attacking Nassig, Germany.',
    description: 'Tanks that will support the attack protect infantrymen from surprise enemy thrust. Company D, 66th Armored Infantry Battalion, 43rd Tank Battalion, 12th Armored Division. Nassig, Germany.',
    image: '12th-armored-division-01.jpg',
    category: 'Tanks',
    source: 'National Archives and Records Administration: SC 364383',
    date: '1 April 1945'
  },
  {
    id: 430,
    name: 'Loading a 155mm M1 rifle of Btry B, 49th Coast Artillery, Section 2, Black troops operating.',
    description: 'Location not specified.',
    image: '49th-coast-artillery-battalion-01.jpg',
    category: 'Artillery',
    source: 'National Archives and Records Administration: SC 364569',
    date: '16 April 1944'
  },
  {
    id: 431,
    name: 'Members of the 49th Coast Artillery, (Colored) firing 155mm howitzer at night on Bougainville.',
    description: '49th Coastal Artillery.',
    image: '49th-coast-artillery-battalion-04.jpg',
    category: 'Artillery',
    source: 'National Archives and Records Administration: SC 364572',
    date: ''
  },
  {
    id: 432,
    name: 'Sgt. John C. Clark, Lorman, Miss., and S/Sgt. Ford M. Shaw, Tuscon, Arizo., (l-r) clean their rifles in bivouac area alongside the (illegible) Trail, Bogainville.',
    description: 'They are members of Co. E, 25th Combat Team, 93rd Infantry Division (colored). This is the first time that Black ground troops have been used in this theater in combat. 93rd Infantry Division.',
    image: '93rd-infantry-division-01.jpg',
    category: 'Infantry',
    source: 'National Archives and Records Administration: SC 364565',
    date: '4 April 1944'
  },
  {
    id: 434,
    name: 'Before taking off on a pass, Cpl. Clarence Carter, 1808 Bainbridge St. Philadelphia, Pa., with 411th Port Company, gives his shoes a good shine.',
    description: 'Le Havre Port of Embarkation, 411th Port Company.',
    image: '411th-port-company-01.jpg',
    category: '',
    source: 'National Archives and Records Administration: SC 364378',
    date: '3 August 1945'
  },
  {
    id: 436,
    name: '92nd. Div. offensive. Men of 370th Inf. Regt. dismounted from the tanks used to carry them to vicinity of Cinquale Canal, move away from tanks.',
    description: '370th Infantry Regiment, 92nd Infantry Division.',
    image: '92nd-infantry-division-03.jpg',
    category: 'Infantry',
    source: 'National Archives and Records Administration: SC 364369',
    date: '8 February 1945'
  },
  {
    id: 439,
    name: 'Major General John C.H. Lee during an inspection tour of Black troops somewhere in England.',
    description: 'The 398th Port Battalion, Services of Supply, Bristol, England.',
    image: '398th-port-battalion-02.jpg',
    category: '',
    source: 'National Archives and Records Administration: SC 151564',
    date: '2 October 1942'
  },
  {
    id: 440,
    name: 'Major Gen. John C.H. Lee and Brig. General Benj. O. Davis inspect troops somewhere in England.',
    description: 'Company C, 398th Port Bn., Bristol, England.',
    image: '398th-port-battalion-04.jpg',
    category: '',
    source: 'National Archives and Records Administration: SC 151567',
    date: '2 October 1942'
  },
  {
    id: 900, 
    name: 'Lawrence Johnson', 
    description: 'Lawrence Johnson served in the 614th Tank Destroyer Battalion during World War II and this photograph is included in the book "The 614th Tank Destroyer Battalion: Fighting on Both Fronts".', 
    image: 'lawrence-johnson-614th-tank-destroyer-1945.jpg', 
    category: 'Portrait',
    source: 'Lawrence Johnson family', 
    date: '1945'
  }, 
  {
    id: 901, 
    name: 'Stafford Rimes', 
    description: 'Stafford Rimes served in the 452nd Anti-Aircraft Artillery Battalion and he was killed in action on 21 November 1944. This photograph is included in the book "The 452nd Anti-Aircraft Artillery Battalion: Destroyers of the Luftwaffe and Jim Crow".', 
    image: 'stafford-rimes-452nd-anti-aircraf-artillery.jpg', 
    category: 'Portrait', 
    source: 'Stafford Rimes family', 
    date: 'Undated'
  }, 
];

// Main component
export default function Gallery() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredImages = imageData.filter((image) => {
    const matchesSearch =
      image.name.toLowerCase().includes(search.toLowerCase()) ||
      image.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || image.category === category;
    return matchesSearch && matchesCategory;
  });

  // Generate the categories dynamically, excluding blank categories
  const categories = ['All', ...new Set(imageData
    .map((img) => img.category)
    .filter((cat) => cat !== '') // Exclude blank categories
  )];

  // Prepare schema JSON-LD for the entire gallery
  const schemaData = filteredImages.map((image) => ({
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "name": image.name,
    "contentUrl": `https://www.samueldekorte.com/images/${image.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    "creator": {
      "@type": "Person",
      "name": "Samuel de Korte"
    },
    "datePublished": image.date,
    "description": image.description,
    "image": `https://www.samueldekorte.com/images/${image.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    "publisher": {
      "@type": "Organization",
      "name": "Samuel de Korte History"
    }
  }));

  return (
    <>
      <Head>
        <title>Image Gallery - WWII Historical Images of Black American Soldiers | Samuel de Korte</title>
        <meta property="og:title" content="Image Gallery - Black American Soldiers" />
        <meta name="description" content="Explore a curated gallery showcasing the contributions of Black American soldiers during World War II with historical images and stories." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.samueldekorte.com/images" />

        {/* Schema for the entire gallery */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Collection",
            "name": "Black American Soldiers WWII Gallery",
            "creator": {
              "@type": "Person",
              "name": "Samuel de Korte"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Samuel de Korte History"
            },
            "image": schemaData.map((image) => image.contentUrl),
            "description": "A collection of historical images of Black American soldiers during WWII.",
            "url": "https://www.samueldekorte.com/gallery"
          })}
        </script>

        {/* Meta Tags for Social Sharing */}
        <meta property="og:image" content={`https://www.samueldekorte.com/images/${filteredImages[0]?.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
        <meta property="og:image:alt" content={filteredImages[0]?.name} />
        <meta property="twitter:image" content={`https://www.samueldekorte.com/images/${filteredImages[0]?.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
        <meta property="twitter:image:alt" content={filteredImages[0]?.name} />
      </Head>

      <SimpleLayout
        title="Historical Image Gallery"
        intro="Browse through images showcasing the contributions of Black American soldiers during WWII."
      >
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-4 py-2 w-full max-w-md"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 m-1 rounded-md ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id}>
              <Image
                src={`/images/${image.image}`}  // Updated path
                alt={`Historical image showing ${image.name} of Black American soldiers during WWII`}
                width={400}
                height={300}
                loading="lazy"
                className="rounded-md"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <h3 className="mt-2 text-lg font-semibold">{image.name}</h3>
              <p className="text-sm text-gray-600">{image.description}</p>
              <p className="text-xs text-gray-500">Source: {image.source}</p>
              <p className="text-xs text-gray-500">Date: {image.date}</p>
            </Card>
          ))}
        </div>
      </SimpleLayout>
    </>
  );
}
