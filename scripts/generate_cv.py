from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "gloria-beneth-mbilinyi-cv.pdf"

INK = colors.HexColor("#16212D")
MUTED = colors.HexColor("#52606D")
ACCENT = colors.HexColor("#007F73")
PALE = colors.HexColor("#EAF6F3")
RULE = colors.HexColor("#D6E1E5")


def footer(canvas, document):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.line(18 * mm, 14 * mm, 192 * mm, 14 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 9.5 * mm, "Gloria Beneth Mbilinyi | Developer Portfolio CV")
    canvas.drawRightString(192 * mm, 9.5 * mm, f"Page {document.page}")
    canvas.restoreState()


def section_heading(text, styles):
    return [Spacer(1, 5), Paragraph(text.upper(), styles["section"]), Spacer(1, 4)]


def bullet(text, styles):
    return Paragraph(f"<bullet>&bull;</bullet>{text}", styles["bullet"])


def project(title, description, stack, url, styles):
    return KeepTogether(
        [
            Paragraph(f'<b>{title}</b> | <link href="{url}" color="#007F73">Repository</link>', styles["body"]),
            Paragraph(description, styles["small"]),
            Paragraph(f"<b>Technologies:</b> {stack}", styles["meta"]),
            Spacer(1, 5),
        ]
    )


def build_cv():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Name",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=23,
            leading=27,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Role",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=ACCENT,
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Contact",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=12,
            textColor=MUTED,
        )
    )
    styles.add(
        ParagraphStyle(
            name="section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            textColor=ACCENT,
            borderColor=RULE,
            borderWidth=0,
            borderPadding=0,
            spaceBefore=1,
            spaceAfter=0,
        )
    )
    styles.add(
        ParagraphStyle(
            name="body",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=13.2,
            textColor=INK,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="small",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=12.2,
            textColor=INK,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="meta",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10.5,
            textColor=MUTED,
            spaceAfter=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="bullet",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=12,
            leftIndent=10,
            firstLineIndent=-6,
            bulletIndent=2,
            textColor=INK,
            spaceAfter=2,
        )
    )

    document = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=17 * mm,
        bottomMargin=19 * mm,
        title="Gloria Beneth Mbilinyi - Developer CV",
        author="Gloria Beneth Mbilinyi",
        subject="Computer Engineering, Full-Stack Development, AI and IoT",
    )
    frame = Frame(
        document.leftMargin,
        document.bottomMargin,
        document.width,
        document.height,
        id="content",
    )
    document.addPageTemplates([PageTemplate(id="cv", frames=[frame], onPage=footer)])

    story = [
        Paragraph("Gloria Beneth Mbilinyi", styles["Name"]),
        Paragraph(
            "Computer Engineering Student | Full-Stack Developer | AI &amp; Machine Learning Enthusiast",
            styles["Role"],
        ),
        Table(
            [
                [
                    Paragraph(
                        '<link href="mailto:gloriambilinyi5@gmail.com" color="#52606D">gloriambilinyi5@gmail.com</link>',
                        styles["Contact"],
                    ),
                    Paragraph(
                        '<link href="https://github.com/gloria-mbilinyi" color="#52606D">github.com/gloria-mbilinyi</link>',
                        styles["Contact"],
                    ),
                    Paragraph(
                        '<link href="https://www.linkedin.com/in/gloria-mbilinyi/" color="#52606D">linkedin.com/in/gloria-mbilinyi</link>',
                        styles["Contact"],
                    ),
                ]
            ],
            colWidths=[58 * mm, 58 * mm, 58 * mm],
            style=TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PALE),
                    ("BOX", (0, 0), (-1, -1), 0.5, RULE),
                    ("INNERGRID", (0, 0), (-1, -1), 0.5, RULE),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ]
            ),
        ),
        Spacer(1, 7),
        *section_heading("Profile", styles),
        Paragraph(
            "Computer Engineering student at the Dar es Salaam Institute of Technology with practical experience across full-stack development, artificial intelligence, machine learning, retrieval-augmented generation, IoT, embedded systems, networking, and data analysis. Interested in building reliable, accessible technology that addresses real-world problems.",
            styles["body"],
        ),
        *section_heading("Technical Skills", styles),
        Table(
            [
                [Paragraph("<b>Programming</b><br/>Java, Python, JavaScript, Dart, SQL, C/C++", styles["small"]), Paragraph("<b>Frontend</b><br/>React, Vite, HTML, CSS, Tailwind CSS", styles["small"])],
                [Paragraph("<b>Backend</b><br/>Spring Boot, FastAPI, REST APIs, JWT, Maven", styles["small"]), Paragraph("<b>AI and Data</b><br/>TensorFlow, Scikit-learn, RAG, LangGraph, ChromaDB, Pandas, NumPy", styles["small"])],
                [Paragraph("<b>Databases and Mobile</b><br/>PostgreSQL, SQLite, Flutter, Dart", styles["small"]), Paragraph("<b>IoT and Tools</b><br/>Arduino, ESP32, sensors, Git, GitHub, Docker, Postman", styles["small"])],
            ],
            colWidths=[87 * mm, 87 * mm],
            style=TableStyle(
                [
                    ("GRID", (0, 0), (-1, -1), 0.45, RULE),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 7),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ]
            ),
        ),
        *section_heading("Selected Projects", styles),
        project(
            "TenderGuard Africa",
            "Agentic AI procurement decision-support system that checks compliance, compares submitted prices with historical procurement data, reviews supplier-data inconsistencies, and prepares sourced evidence for human committee review.",
            "Python, LangGraph, MCP, Qwen3, Ollama, Pydantic",
            "https://github.com/gloria-mbilinyi/TenderGuard-Africa",
            styles,
        ),
        project(
            "Smart Clinic Management System",
            "Full-stack healthcare management platform supporting administrator, doctor, and patient roles, appointment workflows, authentication, and medical records.",
            "Java, Spring Boot, Spring Security, JWT, PostgreSQL, React, Vite",
            "https://github.com/gloria-mbilinyi/smart-clinic",
            styles,
        ),
        project(
            "DIT Smart Assistant",
            "Retrieval-Augmented Generation assistant designed to answer questions using institutional information from the Dar es Salaam Institute of Technology.",
            "Python, RAG, ChromaDB, embeddings, Streamlit",
            "https://github.com/gloria-mbilinyi/dit-smart-assistant",
            styles,
        ),
        *section_heading("Education", styles),
        Table(
            [
                [Paragraph("<b>2024 - Present</b>", styles["meta"]), Paragraph("<b>Bachelor of Engineering in Computer Engineering</b><br/>Dar es Salaam Institute of Technology - Main Campus", styles["small"])],
                [Paragraph("<b>2021 - 2024</b>", styles["meta"]), Paragraph("<b>Diploma in Leather Product Technology</b><br/>Dar es Salaam Institute of Technology - Mwanza Campus | GPA 4.6", styles["small"])],
                [Paragraph("<b>2017 - 2020</b>", styles["meta"]), Paragraph("<b>Secondary Education</b><br/>Mukilima Secondary School | Division One", styles["small"])],
            ],
            colWidths=[35 * mm, 139 * mm],
            style=TableStyle(
                [
                    ("LINEBELOW", (0, 0), (-1, -2), 0.4, RULE),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ]
            ),
        ),
        *section_heading("Practical Engineering Experience", styles),
        bullet("Designed and built multidisciplinary projects spanning full-stack software, machine learning, IoT, embedded control, and networking.", styles),
    ]

    document.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build_cv()
