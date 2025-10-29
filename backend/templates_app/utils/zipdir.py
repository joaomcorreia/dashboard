import os
import zipfile


def zipdir(path, zip_filename):
    """
    Zip an entire directory into a zip file.
    
    Args:
        path (str): Path to the directory to zip
        zip_filename (str): Path where the zip file should be created
    
    Returns:
        str: Path to the created zip file
    """
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(path):
            for file in files:
                file_path = os.path.join(root, file)
                # Create archive name by removing the base path
                arc_name = os.path.relpath(file_path, path)
                zipf.write(file_path, arc_name)
    
    return zip_filename