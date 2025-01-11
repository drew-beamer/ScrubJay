CREATE TABLE `channel_subscription` (
	`channel_id` text NOT NULL,
	`county_code` text NOT NULL,
	`state_code` text NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`last_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`channel_id`, `county_code`, `state_code`)
);
--> statement-breakpoint
CREATE INDEX `county_state_idx` ON `channel_subscription` (`county_code`,`state_code`);--> statement-breakpoint
CREATE INDEX `active_state_idx` ON `channel_subscription` (`active`,`state_code`);--> statement-breakpoint
CREATE TABLE `filtered_species` (
	`common_name` text NOT NULL,
	`channel_id` text NOT NULL,
	PRIMARY KEY(`common_name`, `channel_id`)
);
--> statement-breakpoint
CREATE INDEX `common_name_channel_id_idx` ON `filtered_species` (`common_name`,`channel_id`);--> statement-breakpoint
CREATE TABLE `location` (
	`id` text PRIMARY KEY NOT NULL,
	`county` text NOT NULL,
	`county_code` text NOT NULL,
	`state` text NOT NULL,
	`state_code` text NOT NULL,
	`lat` real NOT NULL,
	`lng` real NOT NULL,
	`name` text NOT NULL,
	`is_private` integer NOT NULL,
	`last_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `county_state_code_idx` ON `location` (`county_code`,`state_code`);--> statement-breakpoint
CREATE TABLE `observation` (
	`species_code` text NOT NULL,
	`sub_id` text NOT NULL,
	`common_name` text NOT NULL,
	`scientific_name` text NOT NULL,
	`location_id` text NOT NULL,
	`observation_date` integer NOT NULL,
	`how_many` integer NOT NULL,
	`observation_valid` integer NOT NULL,
	`observation_reviewed` integer NOT NULL,
	`presence_noted` integer NOT NULL,
	`photo_count` integer DEFAULT 0 NOT NULL,
	`audio_count` integer DEFAULT 0 NOT NULL,
	`video_count` integer DEFAULT 0 NOT NULL,
	`has_comments` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`last_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`species_code`, `sub_id`),
	FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `obs_created_at_idx` ON `observation` (`created_at`);--> statement-breakpoint
CREATE INDEX `obs_location_date_idx` ON `observation` (`location_id`,`observation_date`);--> statement-breakpoint
CREATE INDEX `obs_review_valid_date_idx` ON `observation` (`observation_reviewed`,`observation_valid`,`observation_date`);