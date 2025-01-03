helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx

kubectl get pods -n ingress-nginx
kubectl get service -n ingress-nginx ingress-nginx-controller
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx


minikube delete --all
docker system prune -af --volumes

minikube start \
  --driver=docker \
  --cpus=3 \
  --memory=3900 \
  --kubernetes-version=v1.28.3 \
  --container-runtime=containerd \
  --cni=calico

sudo minikube addons enable ingress
sudo minikube tunnel



kubectl create ns payment-app
kubectl config set-context --current --namespace=payment-app

docker build -t frontend:latest ./frontend --load
minikube image load frontend:latest

docker build -t auth-service:latest ./backend/auth_service --load
minikube image load auth-service:latest

docker build -t payment-service:latest ./backend/payment_service --load
minikube image load payment-service:latest

helm install payment-app . -n payment-app
helm upgrade payment-app . -n payment-app


kubectl delete configmap payment-app-common-code -n payment-app
kubectl create configmap payment-app-common-code --from-file=./backend/common -n payment-app

kubectl get configmap payment-app-common-code -n payment-app -o yaml

#kubectl delete -n payment-app deployment ingress-nginx-controller
helm install ingress-nginx ingress-nginx/ingress-nginx
kubectl get service --namespace payment-app ingress-nginx-controller --output wide --watch





kubectl get pods -n payment-app
kubectl get svc -n payment-app
kubectl get namespaces
kubectl get ingress
kubectl logs -n ingress-nginx ingress-nginx-controller-7df794f99f-dwlbd 
kubectl describe ingress payment-app
kubectl get pods -n ingress-nginx ingress-nginx-controller-7df794f99f-k4vvh 


minikube start --extra-config=apiserver.v=10






curl --location 'http://127.0.0.1:80/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "admin@gmail.com",
  "password": "password"
}
'