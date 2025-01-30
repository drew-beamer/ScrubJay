CREATE TABLE `county_timezones` (
	`county_code` text PRIMARY KEY NOT NULL,
	`timezone` text DEFAULT 'America/Los_Angeles' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `county_code_idx` ON `county_timezones` (`county_code`);