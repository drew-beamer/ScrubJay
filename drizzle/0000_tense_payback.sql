CREATE TABLE `locations` (
	`id` text PRIMARY KEY NOT NULL,
	`county` text NOT NULL,
	`state` text NOT NULL,
	`lat` real NOT NULL,
	`lng` real NOT NULL,
	`name` text NOT NULL,
	`is_private` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `observations` (
	`common_name` text NOT NULL,
	`scientific_name` text NOT NULL,
	`species_code` text NOT NULL,
	`location_id` text NOT NULL,
	`observation_date` integer NOT NULL,
	`creation_date` integer NOT NULL,
	`how_many` integer NOT NULL,
	`observation_valid` integer NOT NULL,
	`observation_reviewed` integer NOT NULL,
	`sub_id` text NOT NULL,
	`presence_noted` integer NOT NULL,
	`has_comments` integer NOT NULL,
	`evidence` text,
	PRIMARY KEY(`species_code`, `sub_id`, `evidence`),
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE cascade ON DELETE cascade
);
