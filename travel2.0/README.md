# Image Store with MinIO

MinIO is a high-performance, S3 compatible object storage solution. This guide will help you set up MinIO for storing images on a remote server.

## Prerequisites

- Docker installed on your remote server
- Basic knowledge of Docker and command line
- Access to the remote server via SSH

## Setting Up MinIO on Remote Server

1. **SSH into your remote server:**

```sh
ssh user@remote-server-ip
```

2. **Pull the MinIO Docker image:**

```sh
docker pull minio/minio
```

3. **Run the MinIO container:**

```sh
docker run -p 9000:9000 --name minio -e "MINIO_ACCESS_KEY=youraccesskey" -e "MINIO_SECRET_KEY=yoursecretkey" minio/minio server /data
```

4. **Access MinIO:**

Open your browser and navigate to `http://remote-server-ip:9000`. Use the access key and secret key you provided to log in.

## Uploading Images

1. **Create a bucket:**

After logging in, create a new bucket where you will store your images.

2. **Upload images:**

Use the web interface to upload images to your bucket.

## Using MinIO with Your Application

To integrate MinIO with your application, you can use the MinIO SDKs available for various programming languages. Below is an example using Python:

1. **Install the MinIO Python SDK:**

```sh
pip install minio
```

2. **Upload an image using the SDK:**

```python
from minio import Minio
from minio.error import S3Error

client = Minio(
  "remote-server-ip:9000",
  access_key="youraccesskey",
  secret_key="yoursecretkey",
  secure=False
)

try:
  client.fput_object(
    "your-bucket-name", "your-image.jpg", "/path/to/your-image.jpg"
  )
  print("Image uploaded successfully.")
except S3Error as exc:
  print("Error occurred.", exc)
```

## Conclusion

You have successfully set up MinIO for image storage on a remote server and learned how to upload images using the MinIO web interface and SDK. For more advanced usage and configurations, refer to the [MinIO documentation](https://docs.min.io/).
