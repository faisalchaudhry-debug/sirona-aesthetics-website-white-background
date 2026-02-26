import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Define structure for Order and related interfaces
// Adjust these based on your actual Supabase types if needed
interface OrderItem {
    quantity: number;
    price_at_purchase: number;
    products: {
        name: string;
    };
}

interface Order {
    id: string;
    created_at: string;
    total_amount: number;
    status: string;
    user_id: string;
    order_items: OrderItem[];
    // Guest order fields
    guest_name?: string;
    guest_email?: string;
    guest_phone?: string;
    // Shipping address
    shipping_line1?: string;
    shipping_line2?: string;
    shipping_city?: string;
    shipping_postcode?: string;
    shipping_country?: string;
    // Billing address
    billing_line1?: string;
    billing_line2?: string;
    billing_city?: string;
    billing_postcode?: string;
    billing_country?: string;
}

interface Profile {
    full_name: string;
    email: string;
    phone?: string;
    company_name?: string;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
}

// Sirona Details
const SIRONA_DETAILS = {
    name: "Sirona Aesthetics Ltd",
    contact: "Jacqueline Shand",
    address: [
        "Unit 24, Huntly Business Centre",
        "Gordon Street, Huntly",
        "Aberdeenshire, AB54 8FG",
        "UNITED KINGDOM"
    ],
    vatNumber: "461093895",
    logoUrl: "https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/5cex07u4g1_1765985064905.png",
    bankDetails: {
        accountNumber: "7776251",
        sortCode: "" // Add if known, otherwise leave blank or remove
    }
};

const POSTAGE_CONSTANTS = {
    price: 7.50,
    vatRate: 0,
    name: "postage and packing"
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

/**
 * Generates the Invoice PDF
 */
export const generateInvoicePDF = (order: Order, profile: Profile) => {
    const doc = new jsPDF();

    // -- HEADER --
    // Logo
    // Note: Ideally load image as base64 or Use an Image object. 
    // jsPDF.addImage can take a URL but it might fail with CORS if not handled. 
    // We will try adding it. If it fails, text fallback.
    const img = new Image();
    img.src = SIRONA_DETAILS.logoUrl;
    img.crossOrigin = "Anonymous"; // Important for CORS if relevant

    // We can't wait for onload in a sync function easily without Promises.
    // Ideally this function should be async.
    // For this implementation, we'll return a Promise.
};

// ... Wait, I should make these async to handle the image loading properly.

export const generateInvoicePDFAsync = async (order: Order, profile: Profile) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;

    // -- HEADER --
    // Logo (Top Right)
    try {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = SIRONA_DETAILS.logoUrl;
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const imgWidth = 40;
                const imgHeight = (img.height * imgWidth) / img.width;
                doc.addImage(img, 'PNG', 155, 10, imgWidth, imgHeight);
                resolve(true);
            };
            img.onerror = resolve;
        });
    } catch (e) { console.error(e); }

    // Title: TAX INVOICE (Top Left)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text("TAX INVOICE", 15, 25);

    // -- META & ADDRESSES --
    const layoutY = 40;
    const col2X = 120; // Meta Column
    const col3X = 155; // Sirona Address Column

    doc.setFontSize(8);

    // Left: Customer Address
    const customerName = profile.full_name || order.guest_name || "Guest Customer";

    // Build shipping address lines from order fields, fall back to profile fields
    const shipLine1 = order.shipping_line1 || profile.address_line1 || '';
    const shipLine2 = order.shipping_line2 || profile.address_line2 || '';
    const shipCity  = order.shipping_city  || profile.city     || '';
    const shipPost  = order.shipping_postcode || profile.postal_code || '';
    const shipCountry = order.shipping_country || profile.country || '';

    const deliverLines = [
        customerName,
        shipLine1,
        shipLine2,
        shipCity,
        shipPost,
        shipCountry ? shipCountry.toUpperCase() : '',
    ].filter(Boolean);
    let currentY = layoutY;
    deliverLines.forEach(line => {
        doc.text(line, 15, currentY);
        currentY += 4;
    });


    // Center-Right: Invoice Meta labels
    let metaY = layoutY;
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Date", col2X, metaY);
    doc.text("Invoice Number", col2X, metaY + 8);
    doc.text("VAT Number", col2X, metaY + 16);

    // Center-Right: Invoice Meta values
    doc.setFont("helvetica", "normal");
    doc.text(formatDate(order.created_at), col2X, metaY + 4);
    doc.text(`INV-${order.id.slice(0, 6).toUpperCase()}`, col2X, metaY + 12);
    doc.text(SIRONA_DETAILS.vatNumber, col2X, metaY + 20);


    // Right: Sirona Details
    let sironaY = layoutY;
    const sironaLines = [
        SIRONA_DETAILS.name,
        `Attention: ${SIRONA_DETAILS.contact}`,
        ...SIRONA_DETAILS.address
    ];
    sironaLines.forEach(line => {
        doc.text(line, col3X, sironaY);
        sironaY += 4;
    });


    // -- ITEMS TABLE --
    const tableStartY = 100;
    const tableBody = order.order_items.map(item => {
        const unitPrice = item.price_at_purchase;
        return [
            item.products.name,
            item.quantity.toFixed(2),
            unitPrice.toFixed(2),
            "20%",
            (unitPrice * item.quantity).toFixed(2)
        ];
    });

    tableBody.push([
        POSTAGE_CONSTANTS.name,
        "1.00",
        POSTAGE_CONSTANTS.price.toFixed(2),
        "No VAT",
        POSTAGE_CONSTANTS.price.toFixed(2)
    ]);

    autoTable(doc, {
        startY: tableStartY,
        head: [['Description', 'Quantity', 'Unit Price', 'VAT', 'Amount GBP']],
        body: tableBody,
        theme: 'plain',
        headStyles: { fontStyle: 'bold', fontSize: 9, halign: 'left' },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { halign: 'right' },
            2: { halign: 'right' },
            3: { halign: 'right' },
            4: { halign: 'right' }
        },
        styles: { fontSize: 9, cellPadding: 3 },
    });

    // Draw lines
    const tableFinalY = (doc as any).lastAutoTable.finalY;
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.line(15, tableStartY, 195, tableStartY); // Above Header
    doc.line(15, tableStartY + 8, 195, tableStartY + 8); // Below Header
    doc.line(120, tableFinalY, 195, tableFinalY); // Partial line for totals? Image shows bold line at bottom of total block. 
    // Actually image shows line below last item.
    doc.line(15, tableFinalY, 195, tableFinalY);


    // -- TOTALS --
    let finalY = tableFinalY + 5;
    const totalsXLabel = 140;
    const totalsXValue = 195;

    const itemsNet = order.order_items.reduce((sum, item) => sum + (item.price_at_purchase * item.quantity), 0);
    const postageNet = POSTAGE_CONSTANTS.price;
    const subtotal = itemsNet + postageNet;
    const itemsVat = itemsNet * 0.20;
    const totalVat = itemsVat; // Postage is 0 VAT
    const totalGross = subtotal + totalVat;

    doc.setFontSize(9);

    // Subtotal
    doc.text("Subtotal", totalsXLabel, finalY);
    doc.text(subtotal.toFixed(2), totalsXValue, finalY, { align: 'right' });

    // Total No VAT (assuming this means Net total of 0-rated items?)
    // Or just total of items with No VAT?
    // Image shows: "TOTAL NO VAT 0.00" then "TOTAL VAT 20% 30.00".
    // Postage is No VAT. So Postage amount is No VAT total?
    // In image: Postage 7.50 No VAT. But Total No VAT is 0.00? Wait.
    // Ah, maybe the image example had different data. 
    // Let's list logic:
    // Total No VAT = sum of items with 0% VAT.
    // Total VAT 20% = Amount of VAT.

    finalY += 5;
    const totalNoVat = postageNet; // Postage is 0%
    doc.text("TOTAL NO VAT", totalsXLabel, finalY);
    doc.text(totalNoVat.toFixed(2), totalsXValue, finalY, { align: 'right' });

    finalY += 5;
    doc.text("TOTAL VAT 20%", totalsXLabel, finalY);
    doc.text(totalVat.toFixed(2), totalsXValue, finalY, { align: 'right' });

    finalY += 2;
    doc.setLineWidth(0.3);
    doc.line(130, finalY, 195, finalY);

    finalY += 5;
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL GBP", totalsXLabel, finalY);
    doc.text(totalGross.toFixed(2), totalsXValue, finalY, { align: 'right' });


    // -- PAYMENT DETAILS --
    // Bottom Leftish
    const paymentY = tableFinalY + 30; // Push down a bit
    let currentPayY = paymentY;

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`Due Date: ${formatDate(order.created_at)}`, 15, currentPayY); // Same as Inv Date

    currentPayY += 5;
    doc.setFont("helvetica", "normal");
    doc.text("Bank payments GBP:", 15, currentPayY);
    currentPayY += 4;
    doc.text("Account name: Sirona Aesthetics Limited", 15, currentPayY);
    currentPayY += 4;
    doc.text(`Sort code: 23-08-01`, 15, currentPayY);
    currentPayY += 4;
    doc.text(`Account No: 80861583`, 15, currentPayY);

    currentPayY += 6;
    doc.text("Bank Payments for EU:", 15, currentPayY);
    currentPayY += 4;
    doc.text("Sirona Aesthetics Ltd", 15, currentPayY);
    currentPayY += 4;
    doc.text("BIC: TRWIBEB1XXX", 15, currentPayY);
    currentPayY += 4;
    doc.text("IBAN: BE50 9677 7762 5118", 15, currentPayY);
    currentPayY += 4;
    doc.text("Account Number: 7776251", 15, currentPayY);

    // Payment Icons / Link (Mocking visually)
    // Payment Icons / Link
    currentPayY += 8;

    // Load Payment Icons Image
    try {
        await new Promise((resolve) => {
            const img = new Image();
            img.src = "https://xkcgalcdpspqximzoxzy.supabase.co/storage/v1/object/public/media/6s3f6mpmgj_1767977724554.png";
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const imgWidth = 40; // Adjust as needed
                const imgHeight = (img.height * imgWidth) / img.width;
                doc.addImage(img, 'PNG', 15, currentPayY, imgWidth, imgHeight);
                resolve(true);
            };
            img.onerror = resolve; // Continue even if load fails
        });
    } catch (e) {
        console.error("Failed to load payment icons", e);
    }

    // Adjust Y to avoid overlap if needed, though 'View and pay' is below
    // doc.setFillColor match not needed anymore.

    doc.setTextColor(0, 100, 200);
    doc.setFontSize(9);
    // Add link to the text
    // Assuming a generic payment URL pattern, can be updated by user
    const paymentUrl = `https://sironaaesthetics.co.uk/account/orders/${order.id}`;
    doc.textWithLink("View and pay online now", 15, currentPayY + 12, { url: paymentUrl });
    doc.setTextColor(0);


    // -- FOOTER FOR PAGE 1 --
    const footerText = "Company Registration No: SC785389. Registered Office: Attention: Jacqueline Shand, Unit 24, Huntly Business Centre, Gordon Street, Huntly, Aberdeenshire, AB54 8FG, United Kingdom.";
    doc.setFontSize(7);
    doc.setTextColor(60);
    const splitFooter = doc.splitTextToSize(footerText, 180);
    doc.text(splitFooter, 15, pageHeight - 10);


    // -- PAYMENT ADVICE SLIP --
    // Check if space remains, otherwise new page
    // Using new page to be safe and clean or bottom if enough space.
    // Image implies it might be a tear-off. Let's look at Y position.
    // If table is long, push to next page.

    if (currentPayY > 200) {
        doc.addPage();
        currentPayY = 20;
    } else {
        // Draw dashed cut line
        currentPayY = 230; // Force to bottom section
        doc.setDrawColor(150);
        (doc as any).setLineDash([3, 3], 0);
        doc.line(0, currentPayY, 210, currentPayY);

        // Scissors Icon
        doc.setFont("ZapfDingbats");
        doc.setFontSize(14);
        doc.text("K", 10, currentPayY + 1.2, { align: 'center', baseline: 'middle' }); // Zapf 'K' is scissors
        (doc as any).setLineDash([], 0);
    }

    currentPayY += 10;
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);
    doc.text("PAYMENT ADVICE", 15, currentPayY + 10);

    // Left: To Sirona
    const adviceY = currentPayY + 30;
    doc.setFontSize(9);

    // Indented Address Block
    const leftBlockX = 40;
    doc.text("To: Sirona Aesthetics Ltd", leftBlockX, adviceY);

    let adY = adviceY + 5;
    doc.text("Attention: Jacqueline Shand", leftBlockX + 5, adY);
    adY += 5;
    doc.text("Unit 24, Huntly Business Centre, Gordon Street", leftBlockX + 5, adY);
    adY += 5;
    doc.text("Huntly", leftBlockX + 5, adY);
    adY += 5;
    doc.text("Aberdeenshire", leftBlockX + 5, adY);
    adY += 5;
    doc.text("AB54 8FG", leftBlockX + 5, adY);
    adY += 5;
    doc.text("UNITED KINGDOM", leftBlockX + 5, adY);

    // Right: Customer Info Table-ish
    const adviceRightX = 120;
    const valueRightX = 160;
    let arY = adviceY;

    const adviceFields = [
        ["Customer", customerName],
        ["Invoice Number", `INV-${order.id.slice(0, 6).toUpperCase()}`],
        ["Amount Due", subtotal.toFixed(2)], // Wait, Amount Due should be Total Gross?
        ["Due Date", formatDate(order.created_at)],
        ["Amount Enclosed", ""]
    ];

    // Check Amount Due logic: "Amount Due" usually forces Total Gross
    adviceFields[2][1] = totalGross.toFixed(2);

    adviceFields.forEach(([label, value], index) => {
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(label, adviceRightX, arY);

        doc.setFont("helvetica", "normal");
        if (label === "Amount Enclosed") {
            // Underline for input
            doc.setDrawColor(0);
            doc.setLineWidth(0.3);
            doc.line(valueRightX, arY, 195, arY);

            doc.setFontSize(7);
            doc.setTextColor(80);
            doc.text("Enter the amount you are paying above", valueRightX, arY + 4);
            doc.setTextColor(0);
        } else {
            doc.text(value, valueRightX, arY);
        }

        arY += 6;

        // Grey Separator Line
        if (index < adviceFields.length - 1) {
            doc.setDrawColor(230);
            doc.setLineWidth(0.1);
            doc.line(adviceRightX, arY - 3, 195, arY - 3);
        }
        arY += 2;
    });

    // Footer again on this page if it's a new page?
    if ((doc as any).internal.getNumberOfPages() > 1) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(60);
        const fText = "Company Registration No: SC785389. Registered Office: Attention: Jacqueline Shand, Unit 24, Huntly Business Centre, Gordon Street, Huntly, Aberdeenshire, AB54 8FG, United Kingdom.";
        const sFooter = doc.splitTextToSize(fText, 180);
        doc.text(sFooter, 15, pageHeight - 10);
    }

    doc.save(`Invoice-INV-${order.id.slice(0, 6).toUpperCase()}.pdf`);
};

/**
 * Generates the Packing Slip PDF
 */
export const generatePackingSlipPDFAsync = async (order: Order, profile: Profile) => {
    const doc = new jsPDF();

    // -- HEADER --
    // Logo (Top Right)
    try {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = SIRONA_DETAILS.logoUrl;
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const imgWidth = 40;
                const imgHeight = (img.height * imgWidth) / img.width;
                doc.addImage(img, 'PNG', 155, 10, imgWidth, imgHeight);
                resolve(true);
            };
            img.onerror = resolve;
        });
    } catch (e) {
        console.error("Failed to load logo", e);
    }

    // Title: PACKING SLIP (Top Left)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text("PACKING SLIP", 15, 25);

    // -- LAYOUT CONSTANTS --
    const layoutY = 45;
    const col1X = 15;
    const col2X = 80;
    const col3X = 115;
    const col4X = 155;

    doc.setFontSize(8);

    // -- Column 1: Deliver To --
    doc.setFont("helvetica", "bold");
    doc.text("Deliver to", col1X, layoutY);

    doc.setFont("helvetica", "normal");
    const customerName = profile.full_name || order.guest_name || "Guest Customer";

    const shipLine1 = order.shipping_line1 || profile.address_line1 || '';
    const shipLine2 = order.shipping_line2 || profile.address_line2 || '';
    const shipCity  = order.shipping_city  || profile.city     || '';
    const shipPost  = order.shipping_postcode || profile.postal_code || '';
    const shipCountry = order.shipping_country || profile.country || '';

    const deliverLines = [
        customerName,
        shipLine1,
        shipLine2,
        shipCity,
        shipPost,
        shipCountry ? shipCountry.toUpperCase() : '',
    ].filter(Boolean);

    let currentY = layoutY + 4;
    deliverLines.forEach(line => {
        doc.text(line, col1X, currentY);
        currentY += 4;
    });

    // Box around Deliver To
    doc.setDrawColor(200);
    doc.rect(col1X - 2, layoutY - 4, 60, (currentY - layoutY + 6));


    // -- Column 2: Invoice Info --
    let col2Y = layoutY;
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Date", col2X, col2Y);
    doc.setFont("helvetica", "normal");
    doc.text(formatDate(order.created_at), col2X, col2Y + 4);

    col2Y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Number", col2X, col2Y);
    doc.setFont("helvetica", "normal");
    doc.text(`INV-${order.id.slice(0, 6).toUpperCase()}`, col2X, col2Y + 4);


    // -- Column 3: Bill To --
    let col3Y = layoutY;
    doc.setFont("helvetica", "bold");
    doc.text("Bill to", col3X, col3Y);

    doc.setFont("helvetica", "normal");

    // Use billing address if different from shipping, otherwise reuse shipping
    const billLine1 = order.billing_line1 || shipLine1;
    const billLine2 = order.billing_line2 || shipLine2;
    const billCity  = order.billing_city  || shipCity;
    const billPost  = order.billing_postcode || shipPost;
    const billCountry = order.billing_country || shipCountry;

    const billLines = [
        customerName,
        billLine1,
        billLine2,
        billCity,
        billPost,
        billCountry ? billCountry.toUpperCase() : '',
    ].filter(Boolean);

    col3Y += 4;
    billLines.forEach(line => {
        doc.text(line, col3X, col3Y);
        col3Y += 4;
    });


    // -- Column 4: Sirona Details --
    let col4Y = layoutY;
    const sironaLines = [
        SIRONA_DETAILS.name,
        `Attention: ${SIRONA_DETAILS.contact}`,
        ...SIRONA_DETAILS.address
    ];

    sironaLines.forEach(line => {
        doc.text(line, col4X, col4Y);
        col4Y += 4;
    });

    col4Y += 4;
    doc.setFont("helvetica", "bold");
    doc.text("VAT Number", col4X, col4Y);
    doc.setFont("helvetica", "normal");
    doc.text(SIRONA_DETAILS.vatNumber, col4X, col4Y + 4);


    // -- ITEMS TABLE --
    const tableStartY = 100;
    const tableBody = order.order_items.map(item => [item.products.name, item.quantity.toFixed(2)]);
    tableBody.push([POSTAGE_CONSTANTS.name, "1.00"]);

    autoTable(doc, {
        startY: tableStartY,
        head: [['Description', 'Quantity']],
        body: tableBody,
        theme: 'plain',
        headStyles: { fontStyle: 'bold', fontSize: 9, halign: 'left' },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { halign: 'right', cellWidth: 30 }
        },
        styles: { fontSize: 9, cellPadding: 3 },
        didParseCell: (data) => {
            // Optional: formatting hooks if needed
        }
    });

    // Draw lines for table (Top of Header, Bottom of Header, Bottom of Last Row)
    const tableFinalY = (doc as any).lastAutoTable.finalY;
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    // Line above Header
    doc.line(15, tableStartY, 195, tableStartY);
    // Line below Header (approx +8y depending on padding)
    doc.line(15, tableStartY + 8, 195, tableStartY + 8);
    // Line below Table
    doc.line(15, tableFinalY, 195, tableFinalY);


    // -- FOOTER --
    const footerText = "Company Registration No: SC785389. Registered Office: Attention: Jacqueline Shand, Unit 24, Huntly Business Centre, Gordon Street, Huntly, Aberdeenshire, AB54 8FG, United Kingdom.";
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(7);
    doc.setTextColor(60);
    // Split text if too long (maxWidth ~180)
    const splitFooter = doc.splitTextToSize(footerText, 180);
    doc.text(splitFooter, 15, pageHeight - 10);

    doc.save(`Packing-Slip-INV-${order.id.slice(0, 6).toUpperCase()}.pdf`);
};
