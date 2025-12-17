-- Insert Products

-- PB Serum "Plus" Series
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('Slim+ (Lipase PB500)', 'The lipolytic engine. Contains Lipase PB500 for triglyceride hydrolysis and localized adiposity reduction.', 140.00, 'pb-serum', '', 100),
('Smooth+ (Collagenase GHPB220)', 'The fibrosis solvent. Targets structural matrix using Collagenase GHPB220 for fibrous cellulite and scars.', 140.00, 'pb-serum', '', 100),
('Drain+ (Hyaluronidase PB3000)', 'The hydraulic regulator. Utilizes Hyaluronidase PB3000 to manage fluid dynamics and edema.', 140.00, 'pb-serum', '', 100),
('Lift+ (Collagenase + Vitamin C)', 'The firming specialist. Specialized formulation for skin laxity and dermal restructuring.', 140.00, 'pb-serum', '', 100);

-- PB Serum "HA" Series
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('PB Serum HA High', 'Dominant in Collagenase. Designed for deep scars, fibrosis, and deep wrinkles.', 160.00, 'pb-serum', '', 50),
('PB Serum HA Medium', 'Dominant in Lipase. Designed for lipomas, double chin, and fatty cellulite.', 160.00, 'pb-serum', '', 50),
('PB Serum HA Low', 'Dominant in Lyase. Designed for periocular region, heavy legs, and fluid retention.', 160.00, 'pb-serum', '', 50);

-- Novacutan
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('Novacutan BioPro', 'Volume & Lift. 3DVS technology for deep dermal hydration and volume restoration. Ages 35+.', 90.00, 'novacutan', '', 50),
('Novacutan YBio', 'Young Bio. HA + HOPAAB for "Beauty Flash", dark circles, and radiance. Ages 20+.', 85.00, 'novacutan', '', 50),
('Novacutan SBio', 'Skin Lift. HA + HOPAAB (double conc) for fine lines, firmness, and skin-lifting. Ages 35+.', 90.00, 'novacutan', '', 50);

-- Smartker
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('Smartker Daily Radiant', 'Contains Keratinase + Vitamin C. For brightening and maintaining the glow post-treatment.', 50.00, 'smartker', '', 200),
('Smartker Daily Extreme Firmness', 'Contains DMAE + Collagenase. For maintaining skin tightness.', 55.00, 'smartker', '', 200),
('Smartker Daily Hyaluronic', 'Contains Low Molecular Weight HA. For deep hydration.', 45.00, 'smartker', '', 200),
('Smartker Daily Multivit', 'A nourishing complex for stressed skin.', 45.00, 'smartker', '', 200),
('Smartker Daily Equilibrium', 'Lipase/Zinc for sebum control in acne-prone skin.', 45.00, 'smartker', '', 200);

-- Devices
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('Easy Touch Device', 'Micro-channeling stamp / twist-bottle system with gold-plated 0.5mm needles.', 150.00, 'devices', '', 30);
