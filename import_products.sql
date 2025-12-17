
-- Clean up existing data to avoid conflicts (optional, careful!)
-- delete from products;

INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '046afd13-7694-4ad9-8b37-2fdb4204e206',
        'PB Serum HA Medium',
        'Dominant in Lipase. Designed for lipomas, double chin, and fatty cellulite.',
        160.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/p59a34i5r5_1765429981387.webp',
        'pb-serum',
        50,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/p59a34i5r5_1765429981387.webp"]',
        'The only recombinant enzymatic system currently on the market.',
        'Latest-generation enzymes.\nReady-to-use, easy-to-apply and minimally invasive device.\n\nActive ingredients\n\nCollagenase PB220 Lipase PB500 and Lyase PB72K*\n\n*Enzymatic system with higher Lipase concentration.\n\nIndications\n\nPresentation designed for double chin, corporal adiposity and cellulite.\n\nBenefits\n\nIt reduces the volume of adipose tissue, regaining the patient’s confidence.\n\nContent\n\n1 lyophilized vial of recombinant enzymatic system.\n1 vial of restorative liquid.\n1 syringe of HA2.0&nbsp;',
        '[]',
        null,
        'pb-serum-ha-medium'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '06224914-6acf-42cf-9415-eccac1e72e1a',
        'Smartker Daily Radiant',
        'Brightening and lightening action for dark spots and areas of excessive pigmentation & enzymatic treatment',
        50.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/5urv97fj8d6_1765063095888.png',
        'smartker',
        200,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/5urv97fj8d6_1765063095888.png"]',
        '',
        'enzymatic treatment.\n\nActive ingredients\n\nKeratinase PB333\n\nSmart Peeling effect, eliminates the excess of dead cells without causing irritation, improving the texture of the skin and promoting the penetration of other active ingredients. Suitable for sensitive skin.\n\nVitamin C (20%)\n\nGreat antioxidant power. Reduces the appearance of dark spots and stimulates the production of collagen, improving skin firmness.&nbsp;\n\nIndications\n\nDull skin.\nHyperpigmentation.\nTreatment and prevention of first signs of aging.\n\nVisible results\n\nRemoval of superficial dark spots.\nMore luminous and firmer skin.\n\nContent\n\n10 vials of lyophilized powder.',
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/8.webp", "https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/9.webp"]',
        null,
        'smartker-daily-radiant'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '0a7cc493-f721-477c-b7c7-834ffc90eca4',
        'PB Serum HA High',
        'Dominant in Collagenase. Designed for deep scars, fibrosis, and deep wrinkles.',
        160.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/wlzqawtm78f_1765429974232.webp',
        'pb-serum',
        50,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/wlzqawtm78f_1765429974232.webp"]',
        'The only recombinant enzymatic system currently on the market.',
        'Latest-generation of enzyme technology.\nReady-to-use, easy-to-apply and minimally invasive.\n\nActive ingredients\n\nCollagenase PB220, Lipase PB500 and Lyase PB72K*\n\n*Enzymatic system with higher Collagenase concentration.\n\nIndications\n\nPresentation designed for scars and fibrosis.\n\nBenefits\n\nIt acts directly on the fibrotic septum, improving the patient’s appearance and functionality.\n\nContent\n\n1 lyophilized vial of recombinant enzymatic system.\n1 vial of restorative liquid.\nI syringe of HA2.0&nbsp;\n\n',
        '[]',
        null,
        'pb-serum-ha-high'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '141d48c0-bf1b-4d5c-afa3-ba5c40c863f7',
        'PB Serum HA Low',
        'Dominant in Lyase. Designed for periocular region, heavy legs, and fluid retention.',
        160.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/gdkvpioft6n_1765429987573.webp',
        'pb-serum',
        50,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/gdkvpioft6n_1765429987573.webp"]',
        'The only recombinant enzymatic system currently on the market.',
        'Latest-generation enzymes.\nReady-to-use, easy-to-apply and minimally invasive device.\n\nActive ingredients\n\nCollagenase PB220, Lipase PB500 and Lyase PB72K*\n\n*Enzymatic system with the same concentration of the three enzymes.\n\nIndications\n\nDesigned for facial reshaping.\n\nBenefits\n\nIt modifies tissue mechanisms to reshape and rejuvenate the patient’s face.\n\nContent\n\n1 lyophilized vial of recombinant enzymatic system.\n1 vial of restorative liquid.',
        '[]',
        null,
        'pb-serum-ha-low'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '35af5919-624d-4985-9dff-3cb86f20e24a',
        'Novacutan BioPro',
        'Volume & Lift. 3DVS technology for deep dermal hydration and volume restoration. Ages 35+',
        90.01,
        'https://github.com/faisaliqbalfaisal723-hub/Sirona-aestetics-media/blob/main/Novacutan.png?raw=true',
        'novacutan',
        50,
        true,
        '["https://github.com/faisaliqbalfaisal723-hub/Sirona-aestetics-media/blob/main/Novacutan.png?raw=true"]',
        null,
        null,
        '[]',
        null,
        'novacutan-biopro'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '3708af15-0fa2-4ec3-a255-2000ae7f5e9a',
        'Smartker Daily Equilibrium',
        'Excellent results in the treatment of acne-prone skin and for photo-aging of the skin.',
        45.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/hxmvkd4kjy6_1765061204536.png',
        'smartker',
        200,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/hxmvkd4kjy6_1765061204536.png"]',
        'Helps control acne breakouts and reduce blemishes.',
        '\nActive ingredients\n\nKeratinase PB333\n\nSmart Peeling effect, eliminates the excess of dead cells without causing irritation, improving the texture of the skin and promoting the penetration of other active ingredients. Suitable for sensitive skin.\n\nVitamin A\n\nKeratolytic effect, sebum regulator and collagen synthesis stimulator. Outstanding active in the treatment of both acne and photo-aging.\n\nVitamin C\n\nAnti-inflammatory and antioxidant action\n\nVitamin E\n\nAntioxidant and moisturizing action\n\nIndications\n\nAcne breakouts\n\nContents\n\n10 vials&nbsp;\n\nAcne scars\nPhotodamage\n\nVisible results\n\nReduction of whiteheads, blackheads and pimples.\nImproved appearance in acne scars.\nDecrease in visible signs of photo-aging (uneven texture, rough and dull skin).\n\nContent\n\n10 vials of lyophilized powder.\n2 vials with 20 mL of reconstitutive solution.\n1 Applicator.\n1 Adaptor.',
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/1.webp", "https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/2_1.webp"]',
        null,
        'smartker-daily-equilibrium'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '3f1ec709-6721-4427-a82d-1599542fef6d',
        'Smartker Daily Extreme Firmness',
        'Intensive enzymatic lifting and global anti-aging therapy.\n',
        55.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/l1f0ouk7lqg_1765060377965.png',
        'smartker',
        200,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/l1f0ouk7lqg_1765060377965.png"]',
        'PBserum - BEST SELLER',
        '\n\nActive ingredients\n\nKeratinase PB333\n\nSmart Peeling effect, eliminates the excess of dead cells without causing irritation, improving the texture of the skin and promoting the penetration of other active ingredients. Suitable for sensitive skin.\n\nCollagenase PB220\n\nWith a visible and long-lasting effect, it promotes the regeneration and synthesis of a new collagen network in the dermis, intensely firming the skin.\n\nDMAE\n\nIncreases skin tone and firmness. Flash effect.\n\nVitamin C\n\nGreat antioxidant power. Reduces the appearance of dark spots and stimulates the production of collagen, improving skin firmness.\n\nHyaluronic Acid\n\nContents\n\n10 vials\n\nContents\n\n10 vials\n\nDeeply hydrates the skin.\n\nIndications\n\nFacial sagging with loss of firmness and elasticity.\nIrregular tone and imperfections.\nVisible signs of aging in mature skin.\n\nVisible results\n\nImproved firmness and tone.\nReduction of wrinkles and visible aging signs.\nTightening and smoothing effect.\nYoung and luminous skin.\n\nContent\n\n10 vials of lyophilized powder.\n2 vials with 20 mL ofreconstitutive solution.\n1 Applicator.\n1 Adaptor.',
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/7.webp"]',
        null,
        'smartker-daily-extreme-firmness'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '4776b498-fb9b-4a69-94bb-1f1553994628',
        'Novacutan YBio',
        'Young Bio. HA + HOPAAB for "Beauty Flash", dark circles, and radiance. Ages 20+.',
        85.00,
        'https://github.com/faisaliqbalfaisal723-hub/Sirona-aestetics-media/blob/main/Novacutan.png?raw=true',
        'novacutan',
        50,
        true,
        '["https://github.com/faisaliqbalfaisal723-hub/Sirona-aestetics-media/blob/main/Novacutan.png?raw=true"]',
        null,
        null,
        '[]',
        null,
        'novacutan-ybio'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '88f95a29-a4ac-4b15-ac24-811df2659741',
        'Smartker Daily Multivit',
        'Sebum-regulating and revitalizing enzymatic treatment for oily and dull skin.\n',
        45.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/4gc72mrmxxh_1765112045892.png',
        'smartker',
        200,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/4gc72mrmxxh_1765112045892.png","https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/0i8t6joatl3h_1765112046267.png","https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/3rxr3xkdkr7_1765112046648.png"]',
        'oily and dull skin repair',
        '\nActive ingredients\n\nKeratinase PB333&nbsp;\n\nSmart Peeling effect, eliminates the excess of dead cells without causing irritation, improving the texture of the skin and promoting the penetration of other active ingredients. Suitable for sensitive skin.\n\nLipase PB500\n\nRemoves excess sebum from the surface of the skin and from inside the pores. Mattifying effect.\n\nVitamin B Complex (B1, B3, B5, B6)\n\nMinimizes the appearance of enlarged pores, repairs the cutaneous barrier and balances moisture levels.&nbsp; Antioxidant and antimicrobial effect.\n\nIndications\n\nOily skin and acne prone skin.\nEnlarged pores.\nBlackheads &amp; whiteheads.\n\nVisible results\n\nContents\n\n10 vials\n\nRegulation of oily skin’s excess sebum production.\nReduction of blackheads and enlarged pores.\nMatte and luminous skin.\n\nContent\n\n10 vials of lyophilized powder.\n\n',
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/3.webp", "https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/4.webp"]',
        35,
        'smartker-daily-multivit'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '9288493e-7338-42e4-8186-1b02e8c98303',
        'HA Partial Corrector',
        'Partial Filler Corrector is a second-generation recombinant hyaluronidase with lower immunogenicity.',
        20.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/kmlmblhj49_1765431333456.webp',
        'pb-serum',
        0,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/kmlmblhj49_1765431333456.webp"]',
        'Partial Filler Corrector is a second-generation recombinant hyaluronidase with lower immunogenicity.',
        'Partial Filler Corrector is a second-generation recombinant hyaluronidase with lower immunogenicity. It is ideal for a visible and immediate solution of modulations and corrections derived from the application of HA fillers.\n\nActive ingredients\n\nSecond generation hyaluronidase PB3000.\n\nIndications\n\nDesigned for modulations and corrections:\n\nExcess volume\nAsymmetries\nTyndall effect (bluish colouring)\nOedema\nGranuloma\nNodules\nBiofilms\n\nBenefits\n\nPartial removal of hyaluronic acid fillers.\n\nContent\n\n1 lyophilized vial with 2 hyaluronidase ucat*&nbsp; &nbsp;per vial&nbsp;\n',
        '[]',
        null,
        'ha-partial-corrector'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        '956b0e4b-6559-48b6-95cb-7c9a7eb99d23',
        'Novacutan SBio',
        'Skin Lift. HA + HOPAAB (double conc) for fine lines, firmness, and skin-lifting. Ages 35+.',
        90.00,
        'https://github.com/faisaliqbalfaisal723-hub/Sirona-aestetics-media/blob/main/Novacutan.png?raw=true',
        'novacutan',
        50,
        true,
        '["https://github.com/faisaliqbalfaisal723-hub/Sirona-aestetics-media/blob/main/Novacutan.png?raw=true"]',
        null,
        null,
        '[]',
        null,
        'novacutan-sbio'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        'afd4b56f-66b7-415b-b2bc-c3150d922d97',
        'Slim+ (Lipase PB500)',
        'The lipolytic engine. Contains Lipase PB500 for triglyceride hydrolysis and localized adiposity reduction.',
        140.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/bbaa13oo5u_1765432099311.webp',
        'pb-serum',
        100,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/bbaa13oo5u_1765432099311.webp"]',
        'Lyophilized intensive enzyme powder for conditioning the skin and maintaining its well-being.',
        '\nIngredients\n\nMannitol, Sodium Phosphate, Lipase Disodium EDTA.\n\nDirections for use\n\nAdd 5 ml of saline solution to the vial for reconstitution before the moment of use. Preparation for weekly applications. Each mixture contains the necessary quantity for individual applications on the abdomen and legs. Lightly massage the areas to be treated.\n\nContent\n\n10 vials of sterile lyophilized powder.',
        '[]',
        null,
        'slim-lipase-pb500'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        'b1e89d66-be5a-4fba-9d00-90902678de35',
        'Smartker Daily Hyaluronic',
        'Contains Low Molecular Weight HA. For deep hydration.',
        45.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/taj9q7xn2op_1765063108598.png',
        'smartker',
        200,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/taj9q7xn2op_1765063108598.png"]',
        'Moisturizing enzymatic treatment, wrinkle and expression line reducer.',
        '\nActive ingredients\n\nKeratinase PB333\n\nSmart Peeling effect; it eliminates the excess of dead cells without causing irritation, improving the texture of the skin and favoring the penetration of other active ingredients.\nSuitable for sensitive skin\n\nHyaluronic Acid LMW&nbsp;\n\nDue to its small size, it penetrates into the deepest layers of the skin, intensely moisturizing and filling in wrinkles from the inside.\n\nIndications\n\nWrinkles and expression lines.\nDry &amp; dehydrated skin.\n\nVisible results\n\nWrinkle reduction.\nMoisturized skin with improved texture.\n\nContent\n\n10 vials\n\n10 vials of lyophilized powder.',
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/6.webp", "https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/5.webp"]',
        null,
        'smartker-daily-hyaluronic'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        'bf86514a-122a-4f12-b793-763850d312f4',
        'HA Total Corrector',
        'Total Filler Corrector is a second-generation recombinant hyaluronidase with lower immunogenicity.',
        40.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/tq32tegnnp9_1765431249981.webp',
        'pb-serum',
        0,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/tq32tegnnp9_1765431249981.webp"]',
        'Total Filler Corrector is a second-generation recombinant hyaluronidase with lower immunogenicity.',
        'Total Filler Corrector is a second-generation recombinant hyaluronidase with lower immunogenicity. It is ideal for a visible and immediate solution of complications derived from the application of HA fillers.\n\nActive ingredients\n\nSecond generation hyaluronidase PB3000.\n\nIndications\n\nDesigned for complications such as:\n\nSerious complications (ischemia and necrosis).\nDissatisfaction of aesthetic result.\n“Start from scratch” - completely stripping fillers\n\nBenefits\n\nComplete removal of hyaluronic acid fillers\n\nContent\n\n1 lyophilized vial with 25 hyaluronidase ucat* ',
        '[]',
        null,
        'ha-total-corrector'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        'bfb71b76-8ebd-4e28-ba85-7cbd87c7e52f',
        'Smooth+ (Collagenase GHPB220)',
        'The fibrosis solvent. Targets structural matrix using Collagenase GHPB220 for fibrous cellulite and scars.',
        140.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/ls9lm9a8nqb_1765432093233.webp',
        'pb-serum',
        103,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/ls9lm9a8nqb_1765432093233.webp"]',
        'Lyophilized enzyme intensive powder for skin texture improvement.',
        'Lyophilized enzyme intensive powder for skin texture improvement.\n\nIngredients\n\nMannitol, Sodium Phosphate, Disodium EDTA, r- Clostridium, Hystolyticum Collagenase G, r- Clostridium Hystolyticum Collagenase H.\n\nDirections for use\n\nAdd 5 ml of saline solution to the vial for reconstitution before the moment of use.&nbsp;\n\nContents\n\n10 vials of lyophilised powder&nbsp;',
        '[]',
        null,
        'smooth-collagenase-ghpb220'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        'c04baa56-01f6-4cdd-8dea-16bf0f41e255',
        'Easy Touch Device',
        'Micro-channeling stamp / twist-bottle system with gold-plated 0.5mm needles.',
        150.00,
        '',
        'devices',
        30,
        true,
        '[]',
        null,
        null,
        '[]',
        null,
        'easy-touch-device'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        'd6dc8618-ce5e-4c53-8345-59d2281de2aa',
        'Drain+ (Hyaluronidase PB3000)',
        'The hydraulic regulator. Utilizes Hyaluronidase PB3000 to manage fluid dynamics and edema.',
        140.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/s05r3j2ufk_1765432105927.webp',
        'pb-serum',
        100,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/s05r3j2ufk_1765432105927.webp"]',
        'Lyophilized enzyme intensive powder for conditioning and improving skin appearance.',
        '\nIngredients\n\nMannitol, Sodium Phosphate, Disodium EDTA, Hyaluronidase.\n\nDirections for use\n\nAdd 5 ml of saline solution to the vial for reconstitution before the moment of use.&nbsp;\n\nContent\n\n10 vials of sterile lyophilized powder.',
        '[]',
        null,
        'drain-hyaluronidase-pb3000'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
INSERT INTO products (
        id, name, description, price, image_url, category, stock, is_active, 
        images, short_description, detailed_description, before_after_images, sale_price, slug
    ) VALUES (
        'd83e70b9-afcc-418a-b915-b49c31bf91e8',
        'Lift+ (Collagenase + Vitamin C)',
        'The firming specialist. Specialized formulation for skin laxity and dermal restructuring.',
        140.00,
        'https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/0olht5flhr2_1765432112126.webp',
        'pb-serum',
        100,
        true,
        '["https://vfrblfviajtyhpwtpzrg.supabase.co/storage/v1/object/public/products/0olht5flhr2_1765432112126.webp"]',
        'Intensive firming solution for improving skin elasticity with Vitamin C.',
        '\nIngredients\n\nPowder vial: Sodium ascorbate, Mannitol, r- Clostridium Hystolyticum Collagenase G, r- Clostridium Hystolyticum Collagenase H.\n\nReconstitution solution vial: Aqua, Sodium phosphate, Dimethyl MEA.\n\nDirection for use\n\nReconstitute the content of the powder vial prior to treating the affected areas.&nbsp;&nbsp;\n\nContent\n\n10 vials of sterile lyophilized powder.\n',
        '[]',
        null,
        'lift-collagenase-vitamin-c'
    ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        stock = EXCLUDED.stock,
        images = EXCLUDED.images,
        short_description = EXCLUDED.short_description,
        detailed_description = EXCLUDED.detailed_description,
        slug = EXCLUDED.slug;
    
