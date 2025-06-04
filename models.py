from app import db
from datetime import datetime

# Get db instance from current app context
def get_db():
    return current_app.extensions['sqlalchemy']

class Contact(db.Model):
    """Model for storing contact form submissions"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Contact {self.name} - {self.email}>'

class Project(db.Model):
    """Model for storing project information"""
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.String(50), unique=True, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    interactive = db.Column(db.Boolean, default=False)
    demo_type = db.Column(db.String(20), nullable=True)
    image_class = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    tech_stack = db.relationship('TechStack', back_populates='project', cascade='all, delete-orphan')
    highlights = db.relationship('Highlight', back_populates='project', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Project {self.title}>'

class TechStack(db.Model):
    """Model for project tech stack items"""
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id', ondelete='CASCADE'))
    name = db.Column(db.String(50), nullable=False)
    
    # Relationship
    project = db.relationship('Project', back_populates='tech_stack')
    
    def __repr__(self):
        return f'<TechStack {self.name}>'

class Highlight(db.Model):
    """Model for project highlight items"""
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id', ondelete='CASCADE'))
    text = db.Column(db.String(255), nullable=False)
    
    # Relationship
    project = db.relationship('Project', back_populates='highlights')
    
    def __repr__(self):
        return f'<Highlight {self.text[:20]}...>'

class Visitor(db.Model):
    """Model for tracking site visitors"""
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(50), nullable=True)
    user_agent = db.Column(db.String(255), nullable=True)
    page_visited = db.Column(db.String(100), nullable=False)
    visit_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Visitor {self.ip_address} - {self.page_visited}>'

class GalleryImage(db.Model):
    """Model for storing AI-generated image gallery items"""
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), nullable=False)
    tool = db.Column(db.String(100), nullable=True)  # AI tool used to generate the image
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<GalleryImage {self.title}>'
