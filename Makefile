pip-anki:
	cd apps/serverless/anki && pip install -r requirements.txt -t ./package

package-anki:
	cd apps/serverless/anki/package && zip -r ../package.zip . && cd .. && zip package.zip make_anki.py && mv package.zip ../

zip-anki:
	make pip-anki && make package-anki

check-tf:
	cd apps/serverless/anki && terraform fmt -check=true && terraform validate

deploy-tf:
	make check-tf && cd apps/serverless && terraform init && terraform apply
