const filterData = [
	{
		"species": "Emu"
	},
	{
		"species": "Bar-headed Goose"
	},
	{
		"species": "Snow Goose"
	},
	{
		"species": "Ross's Goose"
	},
	{
		"species": "Snow x Ross's Goose (hybrid)"
	},
	{
		"species": "Graylag Goose"
	},
	{
		"species": "Swan Goose"
	},
	{
		"species": "Graylag x Swan Goose (hybrid)"
	},
	{
		"species": "Greater White-fronted Goose"
	},
	{
		"species": "Emperor x Greater White-fronted Goose (hybrid)"
	},
	{
		"species": "Snow x Greater White-fronted Goose (hybrid)"
	},
	{
		"species": "Brant"
	},
	{
		"species": "Barnacle Goose"
	},
	{
		"species": "Cackling Goose"
	},
	{
		"species": "Greater White-fronted x Cackling Goose (hybrid)"
	},
	{
		"species": "Canada Goose"
	},
	{
		"species": "Swan Goose x Canada Goose (hybrid)"
	},
	{
		"species": "Greater White-fronted x Canada Goose (hybrid)"
	},
	{
		"species": "Graylag x Canada Goose (hybrid)"
	},
	{
		"species": "Domestic goose sp. x Canada Goose (hybrid)"
	},
	{
		"species": "Snow x Canada Goose (hybrid)"
	},
	{
		"species": "Barnacle x Canada Goose (hybrid)"
	},
	{
		"species": "Hawaiian Goose"
	},
	{
		"species": "Red-breasted Goose"
	},
	{
		"species": "Mute Swan"
	},
	{
		"species": "Black Swan"
	},
	{
		"species": "Black-necked Swan"
	},
	{
		"species": "Trumpeter Swan"
	},
	{
		"species": "Tundra Swan"
	},
	{
		"species": "Upland Goose"
	},
	{
		"species": "Egyptian Goose"
	},
	{
		"species": "Ruddy Shelduck"
	},
	{
		"species": "South African Shelduck"
	},
	{
		"species": "Common Shelduck"
	},
	{
		"species": "Crested Duck"
	},
	{
		"species": "Muscovy Duck"
	},
	{
		"species": "Ringed Teal"
	},
	{
		"species": "Wood Duck"
	},
	{
		"species": "Mandarin Duck"
	},
	{
		"species": "Blue-winged Teal"
	},
	{
		"species": "Cinnamon Teal"
	},
	{
		"species": "Blue-winged x Cinnamon Teal (hybrid)"
	},
	{
		"species": "Northern Shoveler"
	},
	{
		"species": "Blue-winged Teal x Northern Shoveler (hybrid)"
	},
	{
		"species": "Cinnamon Teal x Northern Shoveler (hybrid)"
	},
	{
		"species": "Gadwall"
	},
	{
		"species": "Northern Shoveler x Gadwall (hybrid)"
	},
	{
		"species": "Eurasian Wigeon"
	},
	{
		"species": "American Wigeon"
	},
	{
		"species": "Northern Shoveler x American Wigeon (hybrid)"
	},
	{
		"species": "Gadwall x American Wigeon (hybrid)"
	},
	{
		"species": "Eurasian x American Wigeon (hybrid)"
	},
	{
		"species": "Chiloe Wigeon"
	},
	{
		"species": "Mallard"
	},
	{
		"species": "Muscovy Duck x Mallard (hybrid)"
	},
	{
		"species": "Wood Duck x Mallard (hybrid)"
	},
	{
		"species": "Northern Shoveler x Mallard (hybrid)"
	},
	{
		"species": "Gadwall x Mallard (hybrid)"
	},
	{
		"species": "American Wigeon x Mallard (hybrid)"
	},
	{
		"species": "Mallard x Mexican Duck (hybrid)"
	},
	{
		"species": "White-cheeked Pintail"
	},
	{
		"species": "Northern Pintail"
	},
	{
		"species": "Gadwall x Northern Pintail (hybrid)"
	},
	{
		"species": "American Wigeon x Northern Pintail (hybrid)"
	},
	{
		"species": "Mallard x Northern Pintail (hybrid)"
	},
	{
		"species": "Green-winged Teal"
	},
	{
		"species": "Blue-winged x Green-winged Teal (hybrid)"
	},
	{
		"species": "Cinnamon x Green-winged Teal (hybrid)"
	},
	{
		"species": "Gadwall x Green-winged Teal (hybrid)"
	},
	{
		"species": "Northern Pintail x Green-winged Teal (hybrid)"
	},
	{
		"species": "Red-crested Pochard"
	},
	{
		"species": "Canvasback"
	},
	{
		"species": "Redhead"
	},
	{
		"species": "Canvasback x Redhead (hybrid)"
	},
	{
		"species": "Ring-necked Duck"
	},
	{
		"species": "Redhead x Ring-necked Duck (hybrid)"
	},
	{
		"species": "Tufted Duck"
	},
	{
		"species": "Ring-necked x Tufted Duck (hybrid)"
	},
	{
		"species": "Greater Scaup"
	},
	{
		"species": "Ring-necked Duck x Greater Scaup (hybrid)"
	},
	{
		"species": "Tufted Duck x Greater Scaup (hybrid)"
	},
	{
		"species": "Lesser Scaup"
	},
	{
		"species": "Ring-necked Duck x Lesser Scaup (hybrid)"
	},
	{
		"species": "Tufted Duck x Lesser Scaup (hybrid)"
	},
	{
		"species": "Ring-necked Duck x scaup sp. (hybrid)"
	},
	{
		"species": "Tufted Duck x scaup sp. (hybrid)"
	},
	{
		"species": "Harlequin Duck"
	},
	{
		"species": "Surf Scoter"
	},
	{
		"species": "White-winged Scoter"
	},
	{
		"species": "Stejneger's Scoter"
	},
	{
		"species": "Black Scoter"
	},
	{
		"species": "Long-tailed Duck"
	},
	{
		"species": "Bufflehead"
	},
	{
		"species": "Common Goldeneye"
	},
	{
		"species": "Bufflehead x Common Goldeneye (hybrid)"
	},
	{
		"species": "Barrow's Goldeneye"
	},
	{
		"species": "Common x Barrow's Goldeneye (hybrid)"
	},
	{
		"species": "Hooded Merganser"
	},
	{
		"species": "Bufflehead x Hooded Merganser (hybrid)"
	},
	{
		"species": "Common Goldeneye x Hooded Merganser (hybrid)"
	},
	{
		"species": "Barrow's Goldeneye x Hooded Merganser (hybrid)"
	},
	{
		"species": "goldeneye sp. x Hooded Merganser (hybrid)"
	},
	{
		"species": "Common Merganser"
	},
	{
		"species": "Red-breasted Merganser"
	},
	{
		"species": "Ruddy Duck"
	},
	{
		"species": "Helmeted Guineafowl"
	},
	{
		"species": "Mountain Quail"
	},
	{
		"species": "Northern Bobwhite"
	},
	{
		"species": "Scaled Quail"
	},
	{
		"species": "California Quail"
	},
	{
		"species": "Gambel's Quail"
	},
	{
		"species": "California x Gambel's Quail (hybrid)"
	},
	{
		"species": "Wild Turkey"
	},
	{
		"species": "Ruffed Grouse"
	},
	{
		"species": "Greater Sage-Grouse"
	},
	{
		"species": "Sooty Grouse"
	},
	{
		"species": "Sharp-tailed Grouse"
	},
	{
		"species": "White-tailed Ptarmigan"
	},
	{
		"species": "Gray Partridge"
	},
	{
		"species": "Reeves's Pheasant"
	},
	{
		"species": "Golden Pheasant"
	},
	{
		"species": "Lady Amherst's Pheasant"
	},
	{
		"species": "Golden x Lady Amherst's Pheasant (hybrid)"
	},
	{
		"species": "Ring-necked Pheasant"
	},
	{
		"species": "Kalij Pheasant"
	},
	{
		"species": "Silver Pheasant"
	},
	{
		"species": "Indian Peafowl"
	},
	{
		"species": "Gray Peacock-Pheasant"
	},
	{
		"species": "Red Junglefowl"
	},
	{
		"species": "Black Francolin"
	},
	{
		"species": "Common Quail"
	},
	{
		"species": "Japanese Quail"
	},
	{
		"species": "Chukar"
	},
	{
		"species": "Chilean Flamingo"
	},
	{
		"species": "American Flamingo"
	},
	{
		"species": "Greater Flamingo"
	},
	{
		"species": "Lesser Flamingo"
	},
	{
		"species": "Pied-billed Grebe"
	},
	{
		"species": "Horned Grebe"
	},
	{
		"species": "Red-necked Grebe"
	},
	{
		"species": "Eared Grebe"
	},
	{
		"species": "Western Grebe"
	},
	{
		"species": "Clark's Grebe"
	},
	{
		"species": "Western x Clark's Grebe (hybrid)"
	},
	{
		"species": "Rock Pigeon"
	},
	{
		"species": "Speckled Pigeon"
	},
	{
		"species": "Band-tailed Pigeon"
	},
	{
		"species": "Eurasian Collared-Dove"
	},
	{
		"species": "African Collared-Dove"
	},
	{
		"species": "Eurasian x African Collared-Dove (hybrid)"
	},
	{
		"species": "Spotted Dove"
	},
	{
		"species": "Laughing Dove"
	},
	{
		"species": "Namaqua Dove"
	},
	{
		"species": "Diamond Dove"
	},
	{
		"species": "Zebra Dove"
	},
	{
		"species": "Inca Dove"
	},
	{
		"species": "Common Ground Dove"
	},
	{
		"species": "Ruddy Ground Dove"
	},
	{
		"species": "White-winged Dove"
	},
	{
		"species": "Mourning Dove"
	},
	{
		"species": "White-cheeked Turaco"
	},
	{
		"species": "Greater Roadrunner"
	},
	{
		"species": "Yellow-billed Cuckoo"
	},
	{
		"species": "Lesser Nighthawk"
	},
	{
		"species": "Common Nighthawk"
	},
	{
		"species": "Common Poorwill"
	},
	{
		"species": "Mexican Whip-poor-will"
	},
	{
		"species": "Black Swift"
	},
	{
		"species": "Chimney Swift"
	},
	{
		"species": "Vaux's Swift"
	},
	{
		"species": "White-throated Swift"
	},
	{
		"species": "Black-chinned Hummingbird"
	},
	{
		"species": "Anna's Hummingbird"
	},
	{
		"species": "Black-chinned x Anna's Hummingbird (hybrid)"
	},
	{
		"species": "Costa's Hummingbird"
	},
	{
		"species": "Black-chinned x Costa's Hummingbird (hybrid)"
	},
	{
		"species": "Anna's x Costa's Hummingbird (hybrid)"
	},
	{
		"species": "Calliope Hummingbird"
	},
	{
		"species": "Black-chinned x Calliope Hummingbird (hybrid)"
	},
	{
		"species": "Anna's x Calliope Hummingbird (hybrid)"
	},
	{
		"species": "Rufous Hummingbird"
	},
	{
		"species": "Black-chinned x Rufous Hummingbird (hybrid)"
	},
	{
		"species": "Anna's x Rufous Hummingbird (hybrid)"
	},
	{
		"species": "Calliope x Rufous Hummingbird (hybrid)"
	},
	{
		"species": "Allen's Hummingbird"
	},
	{
		"species": "Anna's x Allen's Hummingbird (hybrid)"
	},
	{
		"species": "Rufous x Allen's Hummingbird (hybrid)"
	},
	{
		"species": "Broad-tailed Hummingbird"
	},
	{
		"species": "Anna's Hummingbird x Selasphorus sp. (hybrid)"
	},
	{
		"species": "Broad-billed Hummingbird"
	},
	{
		"species": "Ridgway's Rail"
	},
	{
		"species": "Virginia Rail"
	},
	{
		"species": "Sora"
	},
	{
		"species": "Common Gallinule"
	},
	{
		"species": "American Coot"
	},
	{
		"species": "Common Gallinule x American Coot (hybrid)"
	},
	{
		"species": "Yellow Rail"
	},
	{
		"species": "Black Rail"
	},
	{
		"species": "Gray Crowned-Crane"
	},
	{
		"species": "Demoiselle Crane"
	},
	{
		"species": "Sandhill Crane"
	},
	{
		"species": "Black-necked Stilt"
	},
	{
		"species": "American Avocet"
	},
	{
		"species": "American Oystercatcher"
	},
	{
		"species": "Black Oystercatcher"
	},
	{
		"species": "American x Black Oystercatcher (hybrid)"
	},
	{
		"species": "Black-bellied Plover"
	},
	{
		"species": "American Golden-Plover"
	},
	{
		"species": "Pacific Golden-Plover"
	},
	{
		"species": "Spur-winged Lapwing"
	},
	{
		"species": "Snowy Plover"
	},
	{
		"species": "Semipalmated Plover"
	},
	{
		"species": "Killdeer"
	},
	{
		"species": "Mountain Plover"
	},
	{
		"species": "Upland Sandpiper"
	},
	{
		"species": "Whimbrel"
	},
	{
		"species": "Long-billed Curlew"
	},
	{
		"species": "Bar-tailed Godwit"
	},
	{
		"species": "Hudsonian Godwit"
	},
	{
		"species": "Marbled Godwit"
	},
	{
		"species": "Ruddy Turnstone"
	},
	{
		"species": "Black Turnstone"
	},
	{
		"species": "Red Knot"
	},
	{
		"species": "Surfbird"
	},
	{
		"species": "Great Knot x Surfbird (hybrid)"
	},
	{
		"species": "Ruff"
	},
	{
		"species": "Sharp-tailed Sandpiper"
	},
	{
		"species": "Stilt Sandpiper"
	},
	{
		"species": "Curlew Sandpiper"
	},
	{
		"species": "Long-toed Stint"
	},
	{
		"species": "Sanderling"
	},
	{
		"species": "Dunlin"
	},
	{
		"species": "Rock Sandpiper"
	},
	{
		"species": "Baird's Sandpiper"
	},
	{
		"species": "Least Sandpiper"
	},
	{
		"species": "Buff-breasted Sandpiper"
	},
	{
		"species": "Pectoral Sandpiper"
	},
	{
		"species": "Semipalmated Sandpiper"
	},
	{
		"species": "Western Sandpiper"
	},
	{
		"species": "Short-billed Dowitcher"
	},
	{
		"species": "Long-billed Dowitcher"
	},
	{
		"species": "Wilson's Snipe"
	},
	{
		"species": "Wilson's Phalarope"
	},
	{
		"species": "Red-necked Phalarope"
	},
	{
		"species": "Red Phalarope"
	},
	{
		"species": "Spotted Sandpiper"
	},
	{
		"species": "Solitary Sandpiper"
	},
	{
		"species": "Wandering Tattler"
	},
	{
		"species": "Greater Yellowlegs"
	},
	{
		"species": "Willet"
	},
	{
		"species": "Lesser Yellowlegs"
	},
	{
		"species": "South Polar Skua"
	},
	{
		"species": "Pomarine Jaeger"
	},
	{
		"species": "Parasitic Jaeger"
	},
	{
		"species": "Long-tailed Jaeger"
	},
	{
		"species": "Common Murre"
	},
	{
		"species": "Pigeon Guillemot"
	},
	{
		"species": "Marbled Murrelet"
	},
	{
		"species": "Scripps's Murrelet"
	},
	{
		"species": "Guadalupe Murrelet"
	},
	{
		"species": "Craveri's Murrelet"
	},
	{
		"species": "Ancient Murrelet"
	},
	{
		"species": "Cassin's Auklet"
	},
	{
		"species": "Parakeet Auklet"
	},
	{
		"species": "Rhinoceros Auklet"
	},
	{
		"species": "Horned Puffin"
	},
	{
		"species": "Tufted Puffin"
	},
	{
		"species": "Black-legged Kittiwake"
	},
	{
		"species": "Sabine's Gull"
	},
	{
		"species": "Bonaparte's Gull"
	},
	{
		"species": "Little Gull"
	},
	{
		"species": "Laughing Gull"
	},
	{
		"species": "Franklin's Gull"
	},
	{
		"species": "Heermann's Gull"
	},
	{
		"species": "Short-billed Gull"
	},
	{
		"species": "Ring-billed Gull"
	},
	{
		"species": "Western Gull"
	},
	{
		"species": "Yellow-footed Gull"
	},
	{
		"species": "California Gull"
	},
	{
		"species": "Herring Gull"
	},
	{
		"species": "Iceland Gull"
	},
	{
		"species": "Lesser Black-backed Gull"
	},
	{
		"species": "Slaty-backed Gull"
	},
	{
		"species": "Glaucous-winged Gull"
	},
	{
		"species": "Western x Glaucous-winged Gull (hybrid)"
	},
	{
		"species": "Herring x Glaucous-winged Gull (hybrid)"
	},
	{
		"species": "Slaty-backed x Glaucous-winged Gull (hybrid)"
	},
	{
		"species": "Glaucous Gull"
	},
	{
		"species": "Herring x Glaucous Gull (hybrid)"
	},
	{
		"species": "Glaucous-winged x Glaucous Gull (hybrid)"
	},
	{
		"species": "Least Tern"
	},
	{
		"species": "Gull-billed Tern"
	},
	{
		"species": "Caspian Tern"
	},
	{
		"species": "Black Tern"
	},
	{
		"species": "Common Tern"
	},
	{
		"species": "Arctic Tern"
	},
	{
		"species": "Forster's Tern"
	},
	{
		"species": "Royal Tern"
	},
	{
		"species": "Elegant Tern"
	},
	{
		"species": "Sandwich x Elegant Tern (hybrid)"
	},
	{
		"species": "Black Skimmer"
	},
	{
		"species": "Red-billed Tropicbird"
	},
	{
		"species": "Red-throated Loon"
	},
	{
		"species": "Pacific Loon"
	},
	{
		"species": "Common Loon"
	},
	{
		"species": "Yellow-billed Loon"
	},
	{
		"species": "Laysan Albatross"
	},
	{
		"species": "Black-footed Albatross"
	},
	{
		"species": "Laysan x Black-footed Albatross (hybrid)"
	},
	{
		"species": "Wilson's Storm-Petrel"
	},
	{
		"species": "Fork-tailed Storm-Petrel"
	},
	{
		"species": "Leach's Storm-Petrel"
	},
	{
		"species": "Townsend's Storm-Petrel"
	},
	{
		"species": "Ashy Storm-Petrel"
	},
	{
		"species": "Black Storm-Petrel"
	},
	{
		"species": "Tristram's Storm-Petrel"
	},
	{
		"species": "Least Storm-Petrel"
	},
	{
		"species": "Northern Fulmar"
	},
	{
		"species": "Murphy's Petrel"
	},
	{
		"species": "Mottled Petrel"
	},
	{
		"species": "Hawaiian Petrel"
	},
	{
		"species": "Cook's Petrel"
	},
	{
		"species": "Pink-footed Shearwater"
	},
	{
		"species": "Flesh-footed Shearwater"
	},
	{
		"species": "Buller's Shearwater"
	},
	{
		"species": "Sooty Shearwater"
	},
	{
		"species": "Short-tailed Shearwater"
	},
	{
		"species": "Manx Shearwater"
	},
	{
		"species": "Black-vented Shearwater"
	},
	{
		"species": "Magnificent Frigatebird"
	},
	{
		"species": "Masked Booby"
	},
	{
		"species": "Nazca Booby"
	},
	{
		"species": "Blue-footed Booby"
	},
	{
		"species": "Brown Booby"
	},
	{
		"species": "Blue-footed x Brown Booby (hybrid)"
	},
	{
		"species": "Red-footed Booby"
	},
	{
		"species": "African Darter"
	},
	{
		"species": "Brandt's Cormorant"
	},
	{
		"species": "Pelagic Cormorant"
	},
	{
		"species": "Double-crested Cormorant"
	},
	{
		"species": "Neotropic Cormorant"
	},
	{
		"species": "Double-crested x Neotropic Cormorant (hybrid)"
	},
	{
		"species": "American White Pelican"
	},
	{
		"species": "Brown Pelican"
	},
	{
		"species": "Pink-backed Pelican"
	},
	{
		"species": "American Bittern"
	},
	{
		"species": "Least Bittern"
	},
	{
		"species": "Great Blue Heron"
	},
	{
		"species": "Great Egret"
	},
	{
		"species": "Snowy Egret"
	},
	{
		"species": "Little Blue Heron"
	},
	{
		"species": "Snowy Egret x Little Blue Heron (hybrid)"
	},
	{
		"species": "Tricolored Heron"
	},
	{
		"species": "Reddish Egret"
	},
	{
		"species": "Cattle Egret"
	},
	{
		"species": "Green Heron"
	},
	{
		"species": "Black-crowned Night-Heron"
	},
	{
		"species": "Yellow-crowned Night-Heron"
	},
	{
		"species": "Black-crowned x Yellow-crowned Night-Heron (hybrid)"
	},
	{
		"species": "White-faced Ibis"
	},
	{
		"species": "Glossy x White-faced Ibis (hybrid)"
	},
	{
		"species": "African Sacred Ibis"
	},
	{
		"species": "Roseate Spoonbill"
	},
	{
		"species": "California Condor"
	},
	{
		"species": "Turkey Vulture"
	},
	{
		"species": "Osprey"
	},
	{
		"species": "White-tailed Kite"
	},
	{
		"species": "Golden Eagle"
	},
	{
		"species": "Northern Harrier"
	},
	{
		"species": "Sharp-shinned Hawk"
	},
	{
		"species": "Cooper's Hawk"
	},
	{
		"species": "Northern Goshawk"
	},
	{
		"species": "Bald Eagle"
	},
	{
		"species": "Savanna Hawk"
	},
	{
		"species": "Harris's Hawk"
	},
	{
		"species": "Red-shouldered Hawk"
	},
	{
		"species": "Common Black x Red-shouldered Hawk (hybrid)"
	},
	{
		"species": "Broad-winged Hawk"
	},
	{
		"species": "Swainson's Hawk"
	},
	{
		"species": "Zone-tailed Hawk"
	},
	{
		"species": "Red-tailed Hawk"
	},
	{
		"species": "Rough-legged Hawk"
	},
	{
		"species": "Red-tailed x Rough-legged Hawk (hybrid)"
	},
	{
		"species": "Ferruginous Hawk"
	},
	{
		"species": "Barn Owl"
	},
	{
		"species": "Flammulated Owl"
	},
	{
		"species": "Western Screech-Owl"
	},
	{
		"species": "Great Horned Owl"
	},
	{
		"species": "Northern Pygmy-Owl"
	},
	{
		"species": "Burrowing Owl"
	},
	{
		"species": "Spotted Owl"
	},
	{
		"species": "Barred Owl"
	},
	{
		"species": "Spotted x Barred Owl (hybrid)"
	},
	{
		"species": "Great Gray Owl"
	},
	{
		"species": "Long-eared Owl"
	},
	{
		"species": "Short-eared Owl"
	},
	{
		"species": "Northern Saw-whet Owl"
	},
	{
		"species": "Oriental Pied-Hornbill"
	},
	{
		"species": "Belted Kingfisher"
	},
	{
		"species": "Lilac-breasted Roller"
	},
	{
		"species": "Keel-billed Toucan"
	},
	{
		"species": "Williamson's Sapsucker"
	},
	{
		"species": "Yellow-bellied Sapsucker"
	},
	{
		"species": "Red-naped Sapsucker"
	},
	{
		"species": "Yellow-bellied x Red-naped Sapsucker (hybrid)"
	},
	{
		"species": "Red-breasted Sapsucker"
	},
	{
		"species": "Yellow-bellied x Red-breasted Sapsucker (hybrid)"
	},
	{
		"species": "Red-naped x Red-breasted Sapsucker (hybrid)"
	},
	{
		"species": "Lewis's Woodpecker"
	},
	{
		"species": "Acorn Woodpecker"
	},
	{
		"species": "Gila Woodpecker"
	},
	{
		"species": "Black-backed Woodpecker"
	},
	{
		"species": "Downy Woodpecker"
	},
	{
		"species": "Nuttall's Woodpecker"
	},
	{
		"species": "Downy x Nuttall's Woodpecker (hybrid)"
	},
	{
		"species": "Ladder-backed Woodpecker"
	},
	{
		"species": "Nuttall's x Ladder-backed Woodpecker (hybrid)"
	},
	{
		"species": "Hairy Woodpecker"
	},
	{
		"species": "Downy x Hairy Woodpecker (hybrid)"
	},
	{
		"species": "Nuttall's x Hairy Woodpecker (hybrid)"
	},
	{
		"species": "Ladder-backed x Hairy Woodpecker (hybrid)"
	},
	{
		"species": "White-headed Woodpecker"
	},
	{
		"species": "Pileated Woodpecker"
	},
	{
		"species": "Northern Flicker"
	},
	{
		"species": "Gilded Flicker"
	},
	{
		"species": "Northern x Gilded Flicker (hybrid)"
	},
	{
		"species": "Yellow-headed Caracara"
	},
	{
		"species": "American Kestrel"
	},
	{
		"species": "Merlin"
	},
	{
		"species": "Peregrine Falcon"
	},
	{
		"species": "Prairie Falcon"
	},
	{
		"species": "Peregrine x Prairie Falcon (hybrid)"
	},
	{
		"species": "Sulphur-crested Cockatoo"
	},
	{
		"species": "Cockatiel"
	},
	{
		"species": "Eclectus Parrot"
	},
	{
		"species": "Alexandrine Parakeet"
	},
	{
		"species": "Rose-ringed Parakeet"
	},
	{
		"species": "Crimson Rosella"
	},
	{
		"species": "Red-rumped Parrot"
	},
	{
		"species": "Budgerigar"
	},
	{
		"species": "Rainbow Lorikeet"
	},
	{
		"species": "Rosy-faced Lovebird"
	},
	{
		"species": "Fischer's Lovebird"
	},
	{
		"species": "Yellow-collared Lovebird"
	},
	{
		"species": "Fischer's x Yellow-collared Lovebird (hybrid)"
	},
	{
		"species": "Gray Parrot"
	},
	{
		"species": "Meyer's Parrot"
	},
	{
		"species": "Monk Parakeet"
	},
	{
		"species": "White-winged Parakeet"
	},
	{
		"species": "Yellow-chevroned Parakeet"
	},
	{
		"species": "Scaly-headed Parrot"
	},
	{
		"species": "Red-crowned Parrot"
	},
	{
		"species": "Lilac-crowned Parrot"
	},
	{
		"species": "Red-crowned x Lilac-crowned Parrot (hybrid)"
	},
	{
		"species": "Red-lored Parrot"
	},
	{
		"species": "Red-crowned x Red-lored Parrot (hybrid)"
	},
	{
		"species": "Yellow-headed Parrot"
	},
	{
		"species": "Yellow-crowned Parrot"
	},
	{
		"species": "Turquoise-fronted Parrot"
	},
	{
		"species": "White-fronted Parrot"
	},
	{
		"species": "Mealy Parrot"
	},
	{
		"species": "Orange-winged Parrot"
	},
	{
		"species": "Pacific Parrotlet"
	},
	{
		"species": "Yellow-faced Parrotlet"
	},
	{
		"species": "Maroon-bellied Parakeet"
	},
	{
		"species": "Black-capped Parakeet"
	},
	{
		"species": "Burrowing Parakeet"
	},
	{
		"species": "Hyacinth Macaw"
	},
	{
		"species": "Orange-fronted Parakeet"
	},
	{
		"species": "Nanday Parakeet"
	},
	{
		"species": "Sun Parakeet"
	},
	{
		"species": "Jandaya Parakeet"
	},
	{
		"species": "Blue-and-yellow Macaw"
	},
	{
		"species": "Military Macaw"
	},
	{
		"species": "Scarlet Macaw"
	},
	{
		"species": "Red-and-green Macaw"
	},
	{
		"species": "Blue-crowned Parakeet"
	},
	{
		"species": "Green Parakeet"
	},
	{
		"species": "Mitred Parakeet"
	},
	{
		"species": "Red-masked Parakeet"
	},
	{
		"species": "White-eyed Parakeet"
	},
	{
		"species": "Olive-sided Flycatcher"
	},
	{
		"species": "Western Wood-Pewee"
	},
	{
		"species": "Willow Flycatcher"
	},
	{
		"species": "Least Flycatcher"
	},
	{
		"species": "Hammond's Flycatcher"
	},
	{
		"species": "Gray Flycatcher"
	},
	{
		"species": "Dusky Flycatcher"
	},
	{
		"species": "Pacific-slope Flycatcher"
	},
	{
		"species": "Cordilleran Flycatcher"
	},
	{
		"species": "Black Phoebe"
	},
	{
		"species": "Eastern Phoebe"
	},
	{
		"species": "Say's Phoebe"
	},
	{
		"species": "Black x Say's Phoebe (hybrid)"
	},
	{
		"species": "Vermilion Flycatcher"
	},
	{
		"species": "Dusky-capped Flycatcher"
	},
	{
		"species": "Ash-throated Flycatcher"
	},
	{
		"species": "Great Crested Flycatcher"
	},
	{
		"species": "Brown-crested Flycatcher"
	},
	{
		"species": "Sulphur-bellied Flycatcher"
	},
	{
		"species": "Tropical Kingbird"
	},
	{
		"species": "Cassin's Kingbird"
	},
	{
		"species": "Western Kingbird"
	},
	{
		"species": "Eastern Kingbird"
	},
	{
		"species": "Scissor-tailed Flycatcher"
	},
	{
		"species": "Western Kingbird x Scissor-tailed Flycatcher (hybrid)"
	},
	{
		"species": "White-eyed Vireo"
	},
	{
		"species": "Bell's Vireo"
	},
	{
		"species": "Gray Vireo"
	},
	{
		"species": "Hutton's Vireo"
	},
	{
		"species": "Yellow-throated Vireo"
	},
	{
		"species": "Cassin's Vireo"
	},
	{
		"species": "Blue-headed Vireo"
	},
	{
		"species": "Plumbeous Vireo"
	},
	{
		"species": "Philadelphia Vireo"
	},
	{
		"species": "Warbling Vireo"
	},
	{
		"species": "Red-eyed Vireo"
	},
	{
		"species": "Philadelphia x Red-eyed Vireo (hybrid)"
	},
	{
		"species": "Yellow-green Vireo"
	},
	{
		"species": "Loggerhead Shrike"
	},
	{
		"species": "Northern Shrike"
	},
	{
		"species": "Canada Jay"
	},
	{
		"species": "Black-throated Magpie-Jay"
	},
	{
		"species": "White-throated Magpie-Jay"
	},
	{
		"species": "Green Jay"
	},
	{
		"species": "Pinyon Jay"
	},
	{
		"species": "Steller's Jay"
	},
	{
		"species": "Island Scrub-Jay"
	},
	{
		"species": "California Scrub-Jay"
	},
	{
		"species": "Woodhouse's Scrub-Jay"
	},
	{
		"species": "Eurasian Magpie"
	},
	{
		"species": "Black-billed Magpie"
	},
	{
		"species": "Yellow-billed Magpie"
	},
	{
		"species": "Clark's Nutcracker"
	},
	{
		"species": "House Crow"
	},
	{
		"species": "American Crow"
	},
	{
		"species": "Pied Crow"
	},
	{
		"species": "Common Raven"
	},
	{
		"species": "Black-capped Chickadee"
	},
	{
		"species": "Mountain Chickadee"
	},
	{
		"species": "Chestnut-backed Chickadee"
	},
	{
		"species": "Eurasian Blue Tit"
	},
	{
		"species": "Oak Titmouse"
	},
	{
		"species": "Juniper Titmouse"
	},
	{
		"species": "Great Tit"
	},
	{
		"species": "Japanese Tit"
	},
	{
		"species": "Verdin"
	},
	{
		"species": "Horned Lark"
	},
	{
		"species": "Northern Rough-winged Swallow"
	},
	{
		"species": "Purple Martin"
	},
	{
		"species": "Tree Swallow"
	},
	{
		"species": "Violet-green Swallow"
	},
	{
		"species": "Bank Swallow"
	},
	{
		"species": "Barn Swallow"
	},
	{
		"species": "Tree x Barn Swallow (hybrid)"
	},
	{
		"species": "Cliff Swallow"
	},
	{
		"species": "Barn x Cliff Swallow (hybrid)"
	},
	{
		"species": "Red-vented Bulbul"
	},
	{
		"species": "Red-whiskered Bulbul"
	},
	{
		"species": "Red-vented x Red-whiskered Bulbul (hybrid)"
	},
	{
		"species": "White-eared Bulbul"
	},
	{
		"species": "Wood Warbler"
	},
	{
		"species": "Bushtit"
	},
	{
		"species": "Wrentit"
	},
	{
		"species": "Vinous-throated Parrotbill"
	},
	{
		"species": "Swinhoe's White-eye"
	},
	{
		"species": "Indian White-eye"
	},
	{
		"species": "Red-billed Leiothrix"
	},
	{
		"species": "Ruby-crowned Kinglet"
	},
	{
		"species": "Golden-crowned Kinglet"
	},
	{
		"species": "Red-breasted Nuthatch"
	},
	{
		"species": "White-breasted Nuthatch"
	},
	{
		"species": "Pygmy Nuthatch"
	},
	{
		"species": "Brown Creeper"
	},
	{
		"species": "Blue-gray Gnatcatcher"
	},
	{
		"species": "Black-tailed Gnatcatcher"
	},
	{
		"species": "California Gnatcatcher"
	},
	{
		"species": "Rock Wren"
	},
	{
		"species": "Canyon Wren"
	},
	{
		"species": "House Wren"
	},
	{
		"species": "Pacific Wren"
	},
	{
		"species": "Marsh Wren"
	},
	{
		"species": "Bewick's Wren"
	},
	{
		"species": "Cactus Wren"
	},
	{
		"species": "American Dipper"
	},
	{
		"species": "Common Hill Myna"
	},
	{
		"species": "European Starling"
	},
	{
		"species": "Bali Myna"
	},
	{
		"species": "Brahminy Starling"
	},
	{
		"species": "Common Myna"
	},
	{
		"species": "Crested Myna"
	},
	{
		"species": "Purple Starling"
	},
	{
		"species": "Blue Mockingbird"
	},
	{
		"species": "Gray Catbird"
	},
	{
		"species": "Brown Thrasher"
	},
	{
		"species": "Bendire's Thrasher"
	},
	{
		"species": "Gray Thrasher"
	},
	{
		"species": "California Thrasher"
	},
	{
		"species": "LeConte's Thrasher"
	},
	{
		"species": "Crissal Thrasher"
	},
	{
		"species": "California x Crissal Thrasher (hybrid)"
	},
	{
		"species": "Sage Thrasher"
	},
	{
		"species": "Northern Mockingbird"
	},
	{
		"species": "Western Bluebird"
	},
	{
		"species": "Mountain Bluebird"
	},
	{
		"species": "Western x Mountain Bluebird (hybrid)"
	},
	{
		"species": "Townsend's Solitaire"
	},
	{
		"species": "Varied Thrush"
	},
	{
		"species": "Swainson's Thrush"
	},
	{
		"species": "Hermit Thrush"
	},
	{
		"species": "American Robin"
	},
	{
		"species": "Bohemian Waxwing"
	},
	{
		"species": "Cedar Waxwing"
	},
	{
		"species": "Gray Silky-flycatcher"
	},
	{
		"species": "Phainopepla"
	},
	{
		"species": "Golden-fronted Leafbird"
	},
	{
		"species": "Golden Palm Weaver"
	},
	{
		"species": "Taveta Golden-Weaver"
	},
	{
		"species": "Southern Masked-Weaver"
	},
	{
		"species": "Village Weaver"
	},
	{
		"species": "Black-headed Weaver"
	},
	{
		"species": "Northern Red Bishop"
	},
	{
		"species": "Zanzibar Red Bishop"
	},
	{
		"species": "Black-winged Bishop"
	},
	{
		"species": "Yellow-crowned Bishop"
	},
	{
		"species": "White-winged Widowbird"
	},
	{
		"species": "Diamond Firetail"
	},
	{
		"species": "Red-browed Firetail"
	},
	{
		"species": "Double-barred Finch"
	},
	{
		"species": "Zebra Finch"
	},
	{
		"species": "Bronze Mannikin"
	},
	{
		"species": "Indian Silverbill"
	},
	{
		"species": "Scaly-breasted Munia"
	},
	{
		"species": "White-rumped Munia"
	},
	{
		"species": "Tricolored Munia"
	},
	{
		"species": "Chestnut Munia"
	},
	{
		"species": "White-headed Munia"
	},
	{
		"species": "Gouldian Finch"
	},
	{
		"species": "Orange-cheeked Waxbill"
	},
	{
		"species": "Common Waxbill"
	},
	{
		"species": "Black-rumped Waxbill"
	},
	{
		"species": "Crimson-rumped Waxbill"
	},
	{
		"species": "Cut-throat"
	},
	{
		"species": "Zebra Waxbill"
	},
	{
		"species": "Red Avadavat"
	},
	{
		"species": "Red-cheeked Cordonbleu"
	},
	{
		"species": "Blue-capped Cordonbleu"
	},
	{
		"species": "Green-winged Pytilia"
	},
	{
		"species": "Peters's Twinspot"
	},
	{
		"species": "Red-billed Firefinch"
	},
	{
		"species": "African Firefinch"
	},
	{
		"species": "Pin-tailed Whydah"
	},
	{
		"species": "Togo Paradise-Whydah"
	},
	{
		"species": "Broad-tailed Paradise-Whydah"
	},
	{
		"species": "Village Indigobird"
	},
	{
		"species": "House Sparrow"
	},
	{
		"species": "Eurasian Tree Sparrow"
	},
	{
		"species": "Sudan Golden Sparrow"
	},
	{
		"species": "Red-throated Pipit"
	},
	{
		"species": "American Pipit"
	},
	{
		"species": "Sprague's Pipit"
	},
	{
		"species": "Evening Grosbeak"
	},
	{
		"species": "Hawfinch"
	},
	{
		"species": "Pine Grosbeak"
	},
	{
		"species": "Gray-crowned Rosy-Finch"
	},
	{
		"species": "House Finch"
	},
	{
		"species": "Purple Finch"
	},
	{
		"species": "Cassin's Finch"
	},
	{
		"species": "European Greenfinch"
	},
	{
		"species": "White-rumped Seedeater"
	},
	{
		"species": "Yellow-fronted Canary"
	},
	{
		"species": "Black-throated Canary"
	},
	{
		"species": "Streaky Seedeater"
	},
	{
		"species": "Common Redpoll"
	},
	{
		"species": "Red Crossbill"
	},
	{
		"species": "European Goldfinch"
	},
	{
		"species": "European Serin"
	},
	{
		"species": "Island Canary"
	},
	{
		"species": "Pine Siskin"
	},
	{
		"species": "Lesser Goldfinch"
	},
	{
		"species": "Lawrence's Goldfinch"
	},
	{
		"species": "American Goldfinch"
	},
	{
		"species": "Black Siskin"
	},
	{
		"species": "Lapland Longspur"
	},
	{
		"species": "Chestnut-collared Longspur"
	},
	{
		"species": "Thick-billed Longspur"
	},
	{
		"species": "Snow Bunting"
	},
	{
		"species": "Grasshopper Sparrow"
	},
	{
		"species": "Chipping Sparrow"
	},
	{
		"species": "Clay-colored Sparrow"
	},
	{
		"species": "Black-chinned Sparrow"
	},
	{
		"species": "Brewer's Sparrow"
	},
	{
		"species": "Clay-colored x Brewer's Sparrow (hybrid)"
	},
	{
		"species": "Black-throated Sparrow"
	},
	{
		"species": "Lark Sparrow"
	},
	{
		"species": "Lark Bunting"
	},
	{
		"species": "American Tree Sparrow"
	},
	{
		"species": "Fox Sparrow"
	},
	{
		"species": "Dark-eyed Junco"
	},
	{
		"species": "White-crowned Sparrow"
	},
	{
		"species": "Dark-eyed Junco x White-crowned Sparrow (hybrid)"
	},
	{
		"species": "Golden-crowned Sparrow"
	},
	{
		"species": "White-crowned x Golden-crowned Sparrow (hybrid)"
	},
	{
		"species": "Harris's Sparrow"
	},
	{
		"species": "White-throated Sparrow"
	},
	{
		"species": "White-crowned x White-throated Sparrow (hybrid)"
	},
	{
		"species": "Golden-crowned x White-throated Sparrow (hybrid)"
	},
	{
		"species": "Dark-eyed Junco x White-throated Sparrow (hybrid)"
	},
	{
		"species": "Sagebrush Sparrow"
	},
	{
		"species": "Bell's Sparrow"
	},
	{
		"species": "Vesper Sparrow"
	},
	{
		"species": "Nelson's Sparrow"
	},
	{
		"species": "Savannah Sparrow"
	},
	{
		"species": "Song Sparrow"
	},
	{
		"species": "Lincoln's Sparrow"
	},
	{
		"species": "Swamp Sparrow"
	},
	{
		"species": "Abert's Towhee"
	},
	{
		"species": "California Towhee"
	},
	{
		"species": "Rufous-crowned Sparrow"
	},
	{
		"species": "Green-tailed Towhee"
	},
	{
		"species": "Spotted Towhee"
	},
	{
		"species": "Yellow-breasted Chat"
	},
	{
		"species": "Yellow-headed Blackbird"
	},
	{
		"species": "Bobolink"
	},
	{
		"species": "Western Meadowlark"
	},
	{
		"species": "Crested Oropendola"
	},
	{
		"species": "Orchard Oriole"
	},
	{
		"species": "Hooded Oriole"
	},
	{
		"species": "Epaulet Oriole"
	},
	{
		"species": "Venezuelan Troupial"
	},
	{
		"species": "Bullock's Oriole"
	},
	{
		"species": "Baltimore Oriole"
	},
	{
		"species": "Bullock's x Baltimore Oriole (hybrid)"
	},
	{
		"species": "Black-backed Oriole"
	},
	{
		"species": "Scott's Oriole"
	},
	{
		"species": "Yellow-breasted Chat x new world oriole sp. (hybrid)"
	},
	{
		"species": "Red-winged Blackbird"
	},
	{
		"species": "Tricolored Blackbird"
	},
	{
		"species": "Bronzed Cowbird"
	},
	{
		"species": "Brown-headed Cowbird"
	},
	{
		"species": "Rusty Blackbird"
	},
	{
		"species": "Brewer's Blackbird"
	},
	{
		"species": "Common Grackle"
	},
	{
		"species": "Great-tailed Grackle"
	},
	{
		"species": "Brewer's Blackbird x Great-tailed Grackle (hybrid)"
	},
	{
		"species": "Ovenbird"
	},
	{
		"species": "Worm-eating Warbler"
	},
	{
		"species": "Northern Waterthrush"
	},
	{
		"species": "Golden-winged x Blue-winged Warbler (hybrid)"
	},
	{
		"species": "Black-and-white Warbler"
	},
	{
		"species": "Prothonotary Warbler"
	},
	{
		"species": "Tennessee Warbler"
	},
	{
		"species": "Orange-crowned Warbler"
	},
	{
		"species": "Lucy's Warbler"
	},
	{
		"species": "Nashville Warbler"
	},
	{
		"species": "Virginia's Warbler"
	},
	{
		"species": "Connecticut Warbler"
	},
	{
		"species": "MacGillivray's Warbler"
	},
	{
		"species": "Mourning Warbler"
	},
	{
		"species": "Kentucky Warbler"
	},
	{
		"species": "Common Yellowthroat"
	},
	{
		"species": "MacGillivray's Warbler x Common Yellowthroat (hybrid)"
	},
	{
		"species": "Hooded Warbler"
	},
	{
		"species": "American Redstart"
	},
	{
		"species": "Cape May Warbler"
	},
	{
		"species": "Northern Parula"
	},
	{
		"species": "Magnolia Warbler"
	},
	{
		"species": "Bay-breasted Warbler"
	},
	{
		"species": "Blackburnian Warbler"
	},
	{
		"species": "Yellow Warbler"
	},
	{
		"species": "Common Yellowthroat x Yellow Warbler (hybrid)"
	},
	{
		"species": "American Redstart x Yellow Warbler (hybrid)"
	},
	{
		"species": "Chestnut-sided Warbler"
	},
	{
		"species": "Blackpoll Warbler"
	},
	{
		"species": "Black-throated Blue Warbler"
	},
	{
		"species": "Palm Warbler"
	},
	{
		"species": "Pine Warbler"
	},
	{
		"species": "Yellow-rumped Warbler"
	},
	{
		"species": "Cape May x Yellow-rumped Warbler (hybrid)"
	},
	{
		"species": "Yellow-throated Warbler"
	},
	{
		"species": "Prairie Warbler"
	},
	{
		"species": "Grace's Warbler"
	},
	{
		"species": "Yellow-rumped x Grace's Warbler (hybrid)"
	},
	{
		"species": "Black-throated Gray Warbler"
	},
	{
		"species": "Yellow-rumped x Black-throated Gray Warbler (hybrid)"
	},
	{
		"species": "Townsend's Warbler"
	},
	{
		"species": "Yellow-rumped x Townsend's Warbler (hybrid)"
	},
	{
		"species": "Black-throated Gray x Townsend's Warbler (hybrid)"
	},
	{
		"species": "Hermit Warbler"
	},
	{
		"species": "Townsend's x Hermit Warbler (hybrid)"
	},
	{
		"species": "Black-throated Gray x Hermit Warbler (hybrid)"
	},
	{
		"species": "Black-throated Green Warbler"
	},
	{
		"species": "Townsend's x Black-throated Green Warbler (hybrid)"
	},
	{
		"species": "Canada Warbler"
	},
	{
		"species": "Wilson's Warbler"
	},
	{
		"species": "Painted Redstart"
	},
	{
		"species": "Hepatic Tanager"
	},
	{
		"species": "Summer Tanager"
	},
	{
		"species": "Scarlet Tanager"
	},
	{
		"species": "Western Tanager"
	},
	{
		"species": "Northern Cardinal"
	},
	{
		"species": "Yellow Grosbeak"
	},
	{
		"species": "Rose-breasted Grosbeak"
	},
	{
		"species": "Black-headed Grosbeak"
	},
	{
		"species": "Rose-breasted x Black-headed Grosbeak (hybrid)"
	},
	{
		"species": "Blue Grosbeak"
	},
	{
		"species": "Lazuli Bunting"
	},
	{
		"species": "Indigo Bunting"
	},
	{
		"species": "Lazuli x Indigo Bunting (hybrid)"
	},
	{
		"species": "Orange-breasted Bunting"
	},
	{
		"species": "Painted Bunting"
	},
	{
		"species": "Dickcissel"
	},
	{
		"species": "Red-crested Cardinal"
	},
	{
		"species": "Yellow-billed Cardinal"
	},
	{
		"species": "White-lined Tanager"
	},
	{
		"species": "Blue-gray Tanager"
	},
	{
		"species": "Blue Dacnis"
	},
	{
		"species": "Saffron Finch"
	},
	{
		"species": "Grassland Yellow-Finch"
	},
	{
		"species": "Blue-black Grassquit"
	},
	{
		"species": "Parrot-billed Seedeater"
	},
	{
		"species": "Cinnamon-rumped Seedeater"
	},
	{
		"species": "Yellow-faced Grassquit"
	}
];

export default filterData;